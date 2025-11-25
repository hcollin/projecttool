// IMPORT: General Libraries
import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";

// IMPORT: Common Models
import { IRoleTemplate, ROLESENIORITY } from "@frosttroll/projecttoolmodels/dist/src/index.js";

// IMPORT: Role Template Entity
import { RoleTemplateEntity } from "./roletemplate.entity";
import { InjectRepository } from "@nestjs/typeorm/dist/common/typeorm.decorators";

// IMPORT: Default Values
import { DEFAULT_ROLETEMPLATES } from "./default_roletemplates";
import { v4 } from "uuid";

@Injectable()
export class RoletemplateService {
    private roletemplateRepository: Repository<RoleTemplateEntity>;

    private databaseSynced: boolean = false;

    private readonly logger = new Logger(RoletemplateService.name);

    constructor(@InjectRepository(RoleTemplateEntity) roletemplateRepository: Repository<RoleTemplateEntity>) {
        this.roletemplateRepository = roletemplateRepository;
        void this.syncDatabaseWithDefaults().then(() => {
            this.databaseSynced = true;
        });
    }

    async getAll(): Promise<IRoleTemplate[]> {
        const res = await this.roletemplateRepository.find();

        if (res) {
            const resParsed = res.map((rt: RoleTemplateEntity) => {
                const iRoleT = {
                    guid: rt.guid,
                    name: rt.name,
                    description: rt.description,
                    seniorities: rt.seniorities as ROLESENIORITY[],
                    groups: rt.groups,
                };
                return iRoleT;
            });
            // this.roleTemplateCache = new Map<string, IRoleTemplate>(resParsed.map((t) => [t.guid, t]));

            return Promise.resolve(resParsed);
        }
        return Promise.resolve([]);
    }

    private async syncDatabaseWithDefaults(): Promise<void> {
        if (this.databaseSynced) {
            return Promise.resolve();
        }

        if (process.env.DB_CLEARDB_ON_STARTUP === "true") {
            await this.roletemplateRepository.clear();
            // Reset auto-incrementing ID sequence
            try {
                await this.roletemplateRepository.query("ALTER SEQUENCE roletemplate_entity_id_seq RESTART WITH 1;");
            } catch (error) {
                // Ignore errors here, as not all databases support sequences
                this.logger.warn(`Could not reset roletemplate_entity_id_seq sequence: ${error as string}`);
            }
        }

        const defaultRolesTemplates = [...(DEFAULT_ROLETEMPLATES as IRoleTemplate[])];
        const existingRoleTemplates = await this.roletemplateRepository.find();
        const existingGuids = new Set(existingRoleTemplates.map((t) => t.guid));

        for (const roleTemplate of defaultRolesTemplates) {
            const guid = typeof roleTemplate.guid === "string" ? (roleTemplate.guid as string) : v4();
            if (!existingGuids.has(guid)) {
                const roleTemplateEntity = this.roletemplateRepository.create({
                    guid: guid,
                    name: roleTemplate.name,
                    description: roleTemplate.description,
                    seniorities: roleTemplate.seniorities,
                    groups: roleTemplate.groups,
                } as RoleTemplateEntity);
                await this.roletemplateRepository.save(roleTemplateEntity);
            }
        }

        return Promise.resolve();
    }
}
