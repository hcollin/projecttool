// IMPORT: General Libraries
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { v4 } from "uuid";

// IMPORT: Project Tool Models
import { CURRENCY, IHourlyPriceGroup, IProject, IProjectBase, ROLESENIORITY } from "@frosttroll/projecttoolmodels";

// IMPORT: Project Common Utils
import { generateRandomProjectName } from "@frosttroll/projecttoolutils";

// IMPORT: DTOs
import { ProjectDto } from "./dtos/project.dto";
import { RoleDto } from "./dtos/role.dto";
import { PhaseDto } from "./dtos/phase.dto";

// IMPORT: Entities
import { ProjectEntity } from "./entities/project.entity";
import { RoleEntity } from "./entities/role.entity";
import { PhaseEntity } from "./entities/phase.entity";

import { DateTime } from "luxon";

@Injectable()
export class ProjectService {
    private readonly logger = new Logger(ProjectService.name);

    private prjRepo: Repository<ProjectEntity>;
    private prjEntMngr: EntityManager;
    private roleRepository: Repository<RoleEntity>;
    private roleEntMngr: EntityManager;
    private phaseRepository: Repository<PhaseEntity>;
    private phaseEntMngr: EntityManager;

    private databaseSynced: boolean = false;

    constructor(
        @InjectRepository(ProjectEntity) projectRepository: Repository<ProjectEntity>,
        projectEntityManager: EntityManager,

        @InjectRepository(RoleEntity) roleRepository: Repository<RoleEntity>,
        roleEntityMananger: EntityManager,

        @InjectRepository(PhaseEntity) phaseRepository: Repository<PhaseEntity>,
        phaseEntityManager: EntityManager,
    ) {
        this.prjRepo = projectRepository;
        this.prjEntMngr = projectEntityManager;
        this.roleRepository = roleRepository;
        this.roleEntMngr = roleEntityMananger;
        this.phaseRepository = phaseRepository;
        this.phaseEntMngr = phaseEntityManager;
        void this.clearDatabase().then(() => {
            this.databaseSynced = true;
        });
        // void this.syncDatabaseWithDefaults().then(() => {
        //     this.databaseSynced = true;
        // });
    }

    /**
     * Get all projects from the database in full detail
     *
     * NOTICE! This method can be very heavy on performance if there are many projects with many relations! USE WITH CARE!
     * @returns
     */
    async getAllProjects(): Promise<IProject[]> {
        this.logger.log("Fetching all projects from database");
        const projectEntities = await this.prjRepo.find({
            relations: ["roles", "phases"],
        });
        return projectEntities.map((projectEntity) => this.convertEntityToDto(projectEntity));
    }

    /**
     * Return a simplified list of all projects that only contains base information.
     * @returns
     */
    async getAllProjectsBase(): Promise<IProjectBase[]> {
        const projectEntities = await this.prjRepo.find({
            select: {
                guid: true,
                organizationGuid: true,
                codename: true,
                realname: true,
                clientName: true,
                description: true,
            },
        });
        return projectEntities.map((projectEntity) => {
            return {
                guid: projectEntity.guid,
                organizationId: projectEntity.organizationGuid,
                codename: projectEntity.codename,
                realname: projectEntity.realname,
                clientName: projectEntity.clientName,
                description: projectEntity.description,
            };
        });
    }

    async getProjectByGuid(guid: string): Promise<ProjectDto | null> {
        const projectEntity = await this.prjRepo.findOne({
            where: { guid },
            relations: ["roles", "phases"],
        });

        if (!projectEntity) {
            return null;
        }

        return this.convertEntityToDto(projectEntity);
    }

    /**
     * Create a new empty project with default values and random code name.
     * @returns
     */
    async createEmptyProject(): Promise<ProjectDto> {
        this.logger.log("Creating new empty project");
        const newProjectEntity = this.createNewProjectEntity("org-default");
        const newEntity = await this.prjRepo.save(newProjectEntity);
        this.logger.log(`New empty project created successfully ${newEntity.guid} ${newEntity.codename}`);
        return this.convertEntityToDto(newEntity);
    }

    /**
     * Create a new project in the database from given project dto
     * @param project project to be created
     */
    async createProject(project: Partial<ProjectDto>): Promise<ProjectDto> {
        const prj = new ProjectEntity();
        prj.updateFromDto(project);

        prj.roles = project.roles
            ? project.roles.map((role) => {
                  const roleEnt = new RoleEntity();
                  roleEnt.updateFromDto(role);
                  return roleEnt;
              })
            : [];

        prj.phases = project.phases
            ? project.phases.map((phase) => {
                  const phaseEnt = new PhaseEntity();
                  phaseEnt.updateFromDto(phase);
                  return phaseEnt;
              })
            : [];

        const res = await this.prjRepo.save(prj);

        return this.convertEntityToDto(res);
    }

    /**
     * Delete a project by its GUID.
     * @param guid GUID of the project to delete
     */
    async deleteProject(guid: string): Promise<void> {
        const ent = await this.prjRepo.find({ where: { guid }, relations: ["roles", "phases"] });
        if (ent.length === 0) {
            this.logger.warn(`Project with GUID '${guid}' not found for deletion`);
            throw new Error(`Project with GUID '${guid}' not found for deletion`);
        }
        if (ent.length > 1) {
            this.logger.warn(`Multiple projects with GUID '${guid}' found for deletion. This should not happen.`);
            throw new Error(`Multiple projects with GUID '${guid}' found for deletion. This should not happen.`);
        }
        this.logger.log(`Deleting project ${ent[0].codename} with GUID '${guid}'`);
        await this.phaseEntMngr.remove(ent[0].phases);
        await this.roleEntMngr.remove(ent[0].roles);
        await this.prjRepo.remove(ent[0]);
    }

    /**
     * Delete a role from a project by its GUID.
     * @param roleGuid
     */
    async deleteRoleFromProject(roleGuid: string): Promise<void> {
        this.logger.log(`Deleting role with GUID '${roleGuid}' from project`);
        const entity = await this.roleRepository.findOne({
            where: { guid: roleGuid },
            relations: ["project"],
        });
        if (entity) {
            // We need to remove all phases with allocations referencing this role
            // NOTICE, WARNING AND TODO! This is a quick ugly hack!
            // This should be done with actual tables and foreign keys in a real database with cascading deletes
            const projectEntity = await this.prjRepo.findOne({
                where: { guid: entity.project.guid },
                relations: ["phases"],
            });
            if (projectEntity) {
                for (const phase of projectEntity.phases) {
                    phase.allocations = phase.allocations.filter((alloc) => alloc.roleGuid !== roleGuid);
                }
                await this.phaseRepository.save(projectEntity.phases);
            }

            await this.roleRepository.remove(entity);
        } else {
            this.logger.warn(`Role with GUID '${roleGuid}' not found for deletion`);
            throw new Error(`Role with GUID '${roleGuid}' not found for deletion`);
        }
    }

    /**
     * Delete a phase from a project by its GUID.
     * @param phaseGuid
     */
    async deletePhaseFromProject(phaseGuid: string): Promise<void> {
        this.logger.log(`Deleting phase with GUID '${phaseGuid}' from project`);
        const entity = await this.phaseRepository.findOne({
            where: { guid: phaseGuid },
            relations: ["project"],
        });
        if (entity) {
            await this.phaseRepository.remove(entity);
        } else {
            this.logger.warn(`Phase with GUID '${phaseGuid}' not found for deletion`);
            throw new Error(`Phase with GUID '${phaseGuid}' not found for deletion`);
        }
    }

    /**
     * Update an existing project.
     * @param prjDto Project data transfer object containing updated information
     * @returns Updated ProjectDto
     */
    async updateProject(prjDto: Partial<ProjectDto>): Promise<ProjectDto> {
        this.logger.log(`Updating project with GUID '${prjDto.guid}'`);

        // Does the project with given GUID exist?
        const prjEnt = await this.prjRepo.findOne({
            where: { guid: prjDto.guid },
            relations: ["roles", "phases"],
        });

        if (!prjEnt) {
            throw new Error(`Project with GUID '${prjDto.guid}' not found for update`);
        }

        prjEnt.updateFromDto(prjDto);

        const replacedRoleGuids: Map<string, string> = new Map<string, string>();

        // Update roles
        if (prjDto.roles) {
            const nroles = prjDto.roles.reduce(
                (roles, updRole) => {
                    // New role
                    const existingRoleIndex = roles.findIndex((r) => r.guid === updRole.guid);
                    if (!updRole.guid || existingRoleIndex === -1) {
                        const nrole = new RoleEntity();
                        nrole.updateFromDto(updRole);
                        nrole.organizationGuid = prjEnt.organizationGuid;
                        nrole.project = prjEnt;
                        nrole.guid = nrole.guid || v4();
                        if (updRole.guid && nrole.guid !== updRole.guid) {
                            replacedRoleGuids.set(updRole.guid, nrole.guid);
                        }
                        roles.push(nrole);
                        this.logger.debug(`New role ${nrole.name} added to project ${prjEnt.codename}`);
                        return roles;
                    }

                    if (existingRoleIndex > -1) {
                        roles[existingRoleIndex].updateFromDto(updRole);
                        this.logger.debug(
                            `Updated role ${roles[existingRoleIndex].name} in project ${prjEnt.codename}`,
                        );
                    }
                    return roles;
                },
                [...prjEnt.roles],
            );

            prjEnt.roles = nroles;
        }

        // Update phases
        if (prjDto.phases) {
            const nphases = prjDto.phases.reduce(
                (phases, updPhase) => {
                    // New phase
                    const existingPhaseIndex = phases.findIndex((p) => p.guid === updPhase.guid);

                    if (!updPhase.guid || existingPhaseIndex === -1) {
                        const nphase = new PhaseEntity();
                        nphase.updateFromDto(updPhase);
                        nphase.organizationGuid = prjEnt.organizationGuid;
                        nphase.project = prjEnt;
                        nphase.guid = updPhase.guid || v4();
                        if (replacedRoleGuids.size > 0 && nphase.allocations) {
                            nphase.allocations = nphase.allocations.map((alloc) => {
                                const newRoleGuid = replacedRoleGuids.get(alloc.roleGuid);
                                if (newRoleGuid) {
                                    return { ...alloc, roleGuid: newRoleGuid };
                                }
                                return alloc;
                            });
                        }
                        phases.push(nphase);
                        this.logger.debug(`New phase ${nphase.name} added to project ${prjEnt.codename}`);
                        return phases;
                    }

                    if (existingPhaseIndex > -1) {
                        phases[existingPhaseIndex].updateFromDto(updPhase);
                        this.logger.debug(
                            `Updated phase ${phases[existingPhaseIndex].name} in project ${prjEnt.codename}`,
                        );
                    }

                    return phases;
                },
                [...prjEnt.phases],
            );
            prjEnt.phases = nphases;
        }

        const nent = await this.prjEntMngr.save(prjEnt);

        return this.convertEntityToDto(nent);
    }

    // /**
    //  * Update an existing role or insert a new one if it doesn't exist.
    //  * @param role Role data transfer object containing updated information
    //  * @returns Updated or inserted RoleDto
    //  */
    // async updateOrInsertRole(role: RoleDto): Promise<RoleDto> {
    //     const roleEnt = await this.roleRepository.findOne({
    //         where: { guid: role.guid },
    //     });
    //     if (!roleEnt) {
    //         const newRoleEnt = this.convertRoleDtoToEntity(role);
    //         const inserted = await this.roleRepository.save(newRoleEnt);
    //         return this.convertRoleEntityToDto(inserted);
    //     }
    //     Object.assign(roleEnt, this.convertRoleDtoToEntity(role));
    //     const updated = await this.roleRepository.save(roleEnt);
    //     return this.convertRoleEntityToDto(updated);
    // }

    // /**
    //  * Update an existing phase or insert a new one if it doesn't exist.
    //  * @param phase Phase data transfer object containing updated information
    //  * @returns Updated or inserted PhaseDto
    //  */
    // async updateOrInsertPhase(phase: PhaseDto): Promise<PhaseDto> {
    //     const phaseEnt = await this.phaseRepository.findOne({
    //         where: { guid: phase.guid },
    //     });

    //     if (!phaseEnt) {
    //         this.logger.debug(`Phase with GUID '${phase.guid}' not found. Inserting new phase. DTO: `, phase);
    //         const newPhaseEnt = this.convertPhaseDtoToEntity(phase);
    //         const inserted = await this.phaseRepository.save(newPhaseEnt);
    //         return this.convertPhaseEntityToDto(inserted);
    //     }
    //     this.logger.debug(
    //         `Phase with GUID '${phase.guid}' found. Updating existing phase. DTO: `,
    //         phase,
    //         " Entity: ",
    //         phaseEnt,
    //     );
    //     Object.assign(phaseEnt, this.convertPhaseDtoToEntity(phase), { id: phaseEnt.id });

    //     this.logger.debug(`Updated phase.: `, phaseEnt);
    //     const updated = await this.phaseRepository.save(phaseEnt);
    //     return this.convertPhaseEntityToDto(updated);
    // }

    //=========================================================================================
    // PRIVATE METHODS
    //=========================================================================================

    private async clearDatabase(): Promise<void> {
        if (this.databaseSynced) {
            return;
        }
        if (process.env.DB_CLEARDB_ON_STARTUP === "true") {
            await this.roleRepository.deleteAll();
            await this.phaseRepository.deleteAll();
            await this.prjRepo.deleteAll();
            try {
                await this.prjRepo.query("ALTER SEQUENCE project_entity_id_seq RESTART WITH 1;");
                await this.prjRepo.query("ALTER SEQUENCE role_entity_id_seq RESTART WITH 1;");
                await this.prjRepo.query("ALTER SEQUENCE phase_entity_id_seq RESTART WITH 1;");
            } catch (error) {
                this.logger.warn(
                    "Failed to reset project_entity_id_seq, role_entity_id_seq or phase_entity_id_seq. They may not exist yet.",
                    error,
                );
            }
        }
    }

    private createNewProjectEntity(orgId: string): ProjectEntity {
        // Default hourly price group
        const defaultPriceGroup: IHourlyPriceGroup = {
            guid: v4(),
            organizationId: orgId,
            name: "Default",
            price: 90,
            currency: CURRENCY.EUR,
            permanent: true,
        };

        const projectEntity = new ProjectEntity();
        projectEntity.guid = v4();
        projectEntity.organizationGuid = orgId;

        projectEntity.codename = generateRandomProjectName();

        projectEntity.start = DateTime.now().startOf("day").toMillis();
        projectEntity.end = DateTime.now().plus({ days: 90 }).startOf("day").toMillis(); // Default to 90 days later
        projectEntity.roles = [];
        projectEntity.flags = [];
        projectEntity.currency = CURRENCY.EUR;
        projectEntity.tech_frontend = [];
        projectEntity.tech_backend = [];
        projectEntity.tech_data = [];
        projectEntity.tech_platform = [];
        projectEntity.tech_tools = [];

        projectEntity.hourPriceGroups = [defaultPriceGroup];
        projectEntity.fixedPrices = [];

        const phase = new PhaseEntity();
        phase.guid = v4();
        phase.organizationGuid = orgId;
        phase.name = "Main phase";
        phase.start = { atProjectStart: true };
        phase.end = { atProjectEnd: true };
        phase.description = "";
        phase.allocations = [];

        projectEntity.phases = [phase];

        return projectEntity;
    }

    /**
     * Convert ProjectEntity to ProjectDto
     * @param projectEntity
     * @returns
     */
    private convertEntityToDto(projectEntity: ProjectEntity): ProjectDto {
        const projectDto = new ProjectDto();
        projectDto.guid = projectEntity.guid;
        projectDto.organizationId = projectEntity.organizationGuid;
        projectDto.codename = projectEntity.codename;
        projectDto.realname = projectEntity.realname;
        projectDto.clientName = projectEntity.clientName;
        projectDto.description = projectEntity.description;
        projectDto.start = projectEntity.start;
        projectDto.end = projectEntity.end;
        projectDto.flags = projectEntity.flags;
        projectDto.targetBudget = projectEntity.targetBudget;
        projectDto.currency = projectEntity.currency as CURRENCY;
        projectDto.techStack = {
            frontend: projectEntity.tech_frontend,
            backend: projectEntity.tech_backend,
            data: projectEntity.tech_data,
            platform: projectEntity.tech_platform,
            tools: projectEntity.tech_tools,
        };
        projectDto.prices = {
            hourlypricegroups: projectEntity.hourPriceGroups,
            fixedprices: projectEntity.fixedPrices,
        };
        projectDto.roles = projectEntity.roles.map((roleEntity) => this.convertRoleEntityToDto(roleEntity));
        projectDto.phases = projectEntity.phases.map((phaseEntity) => this.convertPhaseEntityToDto(phaseEntity));
        return projectDto;
    }

    /**
     * Convert RoleEntity to RoleDto
     * @param roleEntity
     * @returns
     */
    private convertRoleEntityToDto(roleEntity: RoleEntity): RoleDto {
        const roleDto = new RoleDto();
        roleDto.guid = roleEntity.guid;
        roleDto.organizationId = roleEntity.organizationGuid;
        roleDto.name = roleEntity.name;
        roleDto.description = roleEntity.description;
        roleDto.personId = roleEntity.personId;
        roleDto.templateId = roleEntity.templateId;
        roleDto.seniority = roleEntity.seniority as ROLESENIORITY | undefined;
        roleDto.priceGroupId = roleEntity.priceGroupId;
        return roleDto;
    }

    /**
     * Convert PhaseEntity to PhaseDto
     * @param phaseEntity
     * @returns
     */
    private convertPhaseEntityToDto(phaseEntity: PhaseEntity): PhaseDto {
        const phaseDto = new PhaseDto();
        phaseDto.guid = phaseEntity.guid;
        phaseDto.organizationId = phaseEntity.organizationGuid;
        phaseDto.name = phaseEntity.name;
        phaseDto.description = phaseEntity.description;
        phaseDto.start = phaseEntity.start;
        phaseDto.end = phaseEntity.end;
        phaseDto.allocations = phaseEntity.allocations;

        return phaseDto;
    }

    // /**
    //  * Convert ProjectDto to ProjectEntity
    //  * @param projectDto
    //  * @returns
    //  */
    // private convertDtoToEntity(projectDto: ProjectDto): ProjectEntity {
    //     const projectEntity = new ProjectEntity();
    //     projectEntity.guid = projectDto.guid;
    //     projectEntity.organizationGuid = projectDto.organizationId;
    //     projectEntity.codename = projectDto.codename;
    //     projectEntity.realname = projectDto.realname;
    //     projectEntity.clientName = projectDto.clientName;
    //     projectEntity.description = projectDto.description;
    //     projectEntity.start = projectDto.start;
    //     projectEntity.end = projectDto.end;
    //     projectEntity.flags = projectDto.flags;
    //     projectEntity.targetBudget = projectDto.targetBudget;
    //     projectEntity.currency = projectDto.currency as string;
    //     projectEntity.tech_frontend = projectDto.techStack?.frontend || [];
    //     projectEntity.tech_backend = projectDto.techStack?.backend || [];
    //     projectEntity.tech_data = projectDto.techStack?.data || [];
    //     projectEntity.tech_platform = projectDto.techStack?.platform || [];
    //     projectEntity.tech_tools = projectDto.techStack?.tools || [];
    //     projectEntity.hourPriceGroups = projectDto.prices?.hourlypricegroups || [];
    //     projectEntity.fixedPrices = projectDto.prices?.fixedprices || [];
    //     projectEntity.roles = projectDto.roles ? projectDto.roles.map((role) => this.convertRoleDtoToEntity(role)) : [];
    //     projectEntity.phases = projectDto.phases
    //         ? projectDto.phases.map((phase) => this.convertPhaseDtoToEntity(phase))
    //         : [];
    //     return projectEntity;
    // }

    // /**
    //  * Convert RoleDto to RoleEntity
    //  * @param roleDto
    //  * @returns
    //  */
    // private convertRoleDtoToEntity(roleDto: RoleDto): RoleEntity {
    //     const roleEntity = new RoleEntity();
    //     roleEntity.guid = roleDto.guid;
    //     roleEntity.organizationGuid = roleDto.organizationId;
    //     roleEntity.name = roleDto.name;
    //     roleEntity.description = roleDto.description || "";
    //     roleEntity.personId = roleDto.personId || undefined;
    //     roleEntity.templateId = roleDto.templateId || undefined;
    //     roleEntity.priceGroupId = roleDto.priceGroupId || undefined;
    //     roleEntity.seniority = roleDto.seniority as string;
    //     return roleEntity;
    // }

    // /**
    //  * Convert PhaseDto to PhaseEntity
    //  * @param phaseDto
    //  * @returns
    //  */
    // private convertPhaseDtoToEntity(phaseDto: PhaseDto): PhaseEntity {
    //     const phaseEntity = new PhaseEntity();

    //     phaseEntity.guid = phaseDto.guid;
    //     phaseEntity.organizationGuid = phaseDto.organizationId;
    //     phaseEntity.name = phaseDto.name;
    //     phaseEntity.description = phaseDto.description || "";
    //     phaseEntity.start = phaseDto.start;
    //     phaseEntity.end = phaseDto.end;
    //     phaseEntity.allocations = phaseDto.allocations || [];
    //     return phaseEntity;
    // }
}
