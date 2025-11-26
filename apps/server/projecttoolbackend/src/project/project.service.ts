// IMPORT: General Libraries
import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { v4 } from "uuid";

// IMPORT: Project Tool Models
import { CURRENCY, IProject, IProjectBase, ROLESENIORITY } from "@frosttroll/projecttoolmodels";

// IMPORT: DTOs
import { ProjectDto } from "./project.dto";
import { RoleDto } from "./role.dto";
import { PhaseDto } from "./phase.dto";

// IMPORT: Entities
import { ProjectEntity } from "./project.entity";
import { RoleEntity } from "./role.entity";
import { PhaseEntity } from "./phase.entity";

@Injectable()
export class ProjectService {
    private readonly logger = new Logger(ProjectService.name);

    private projectRepository: Repository<ProjectEntity>;

    constructor(@InjectRepository(ProjectEntity) projectRepository: Repository<ProjectEntity>) {
        this.projectRepository = projectRepository;
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
        const projectEntities = await this.projectRepository.find({
            relations: ["roles", "phases"],
        });
        return projectEntities.map((projectEntity) => this.convertEntityToDto(projectEntity));
    }

    /**
     * Return a simplified list of all projects that only contains base information.
     * @returns
     */
    async getAllProjectsBase(): Promise<IProjectBase[]> {
        const projectEntities = await this.projectRepository.find({
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

    /**
     * Create a new project in the database.
     * @param project project to be created
     */
    async createProject(project: Partial<ProjectDto>): Promise<ProjectDto> {
        const projectEntity = this.projectRepository.create({
            guid: project.guid || v4(),
            organizationGuid: project.organizationId,
            codename: project.codename || "",
            realname: project.realname || "",
            clientName: project.clientName || "",
            description: project.description || "",
            start: project.start,
            end: project.end,
            flags: project.flags,
            targetBudget: project.targetBudget,
            currency: project.currency || "EUR",
            tech_frontend: project.techStack?.frontend || [],
            tech_backend: project.techStack?.backend || [],
            tech_data: project.techStack?.data || [],
            tech_platform: project.techStack?.platform || [],
            tech_tools: project.techStack?.tools || [],
            holidays: project.holidays || [],
            hourPriceGroups: project.prices?.hourlypricegroups || [],
            fixedPrices: project.prices?.fixedprices || [],
            roles: project.roles
                ? project.roles.map((role) => {
                      const roleEntity = new RoleEntity();
                      roleEntity.guid = role.guid || v4();
                      roleEntity.organizationGuid = role.organizationId || project.organizationId!;
                      roleEntity.name = role.name;
                      roleEntity.description = role.description || "";
                      roleEntity.personId = role.personId || undefined;
                      roleEntity.templateId = role.templateId || undefined;
                      roleEntity.priceGroupId = role.priceGroupId || undefined;
                      roleEntity.seniority = role.seniority as string;
                      return roleEntity;
                  })
                : [],
            phases: project.phases
                ? project.phases.map((phase) => {
                      const phaseEntity = new PhaseEntity();
                      phaseEntity.guid = phase.guid || v4();
                      phaseEntity.organizationGuid = phase.organizationId || project.organizationId!;
                      phaseEntity.name = phase.name;
                      phaseEntity.description = phase.description || "";
                      phaseEntity.start = phase.start;
                      phaseEntity.end = phase.end;
                      phaseEntity.allocations = phase.allocations || [];
                      if (phase.docItem) {
                          phaseEntity.docItem = phase.docItem;
                      }

                      return phaseEntity;
                  })
                : [],
        } as ProjectEntity);
        this.logger.log(
            `Creating new project with codename '${projectEntity.codename}' and GUID '${projectEntity.guid}'`,
        );
        await this.projectRepository.save(projectEntity);
        return this.convertEntityToDto(projectEntity);
    }

    // async updateProject(project: ProjectDto): Promise<void> {
    //     const projectEnt: ProjectEntity = {
    //         guid: project.guid,
    //         organizationGuid: project.organizationId,
    //         codename: project.codename,
    //         realname: project.realname,
    //         clientName: project.clientName,
    //         description: project.description,
    //         start: project.start,
    //         end: project.end,
    //         flags: project.flags,
    //         targetBudget: project.targetBudget,
    //         currency: project.currency as unknown as string,
    //         tech_frontend: project.techStack?.frontend || [],
    //         tech_backend: project.techStack?.backend || [],
    //         tech_data: project.techStack?.data || [],
    //         tech_platform: project.techStack?.platform || [],
    //         tech_tools: project.techStack?.tools || [],
    //     };
    //     await this.projectRepository.save(projectEnt);
    // }

    //=========================================================================================
    // PRIVATE METHODS
    //=========================================================================================

    private async clearDatabase(): Promise<void> {
        if (process.env.DB_CLEARDB_ON_STARTUP === "true") {
            await this.projectRepository.clear();
            try {
                await this.projectRepository.query("ALTER SEQUENCE project_entity_id_seq RESTART WITH 1;");
                await this.projectRepository.query("ALTER SEQUENCE role_entity_id_seq RESTART WITH 1;");
                await this.projectRepository.query("ALTER SEQUENCE phase_entity_id_seq RESTART WITH 1;");
            } catch (error) {
                this.logger.warn(
                    "Failed to reset project_entity_id_seq, role_entity_id_seq or phase_entity_id_seq. They may not exist yet.",
                    error,
                );
            }
        }
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
}
