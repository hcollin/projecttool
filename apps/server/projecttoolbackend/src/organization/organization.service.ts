import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrganizationEntity } from "./organization.entity";
import { Repository } from "typeorm";

import { IOrganization } from "@frosttroll/projecttoolmodels";
import { DEFAULT_ORGANIZATIONS } from "./defaultorganization";
import { OrganizationDto } from "./organization.dto";

@Injectable()
export class OrganizationService {
    private orgRepo: Repository<OrganizationEntity>;

    private readonly logger = new Logger(OrganizationService.name);

    private defaultOrganization: IOrganization = DEFAULT_ORGANIZATIONS[0];

    constructor(@InjectRepository(OrganizationEntity) repo: Repository<OrganizationEntity>) {
        this.orgRepo = repo;
        void this.syncDatabaseWithDefaults().then(() => {
            this.logger.log("Organization database synchronized with default organizations.");
        });
    }

    /**
     * Get all organizations
     * @returns
     */
    async getAllOrganizations(): Promise<OrganizationDto[]> {
        const orgs = await this.orgRepo.find();
        return orgs.map((org: OrganizationEntity) => {
            return org.getDto();
        });
    }

    /**
     * Get the default organization
     * @returns
     */
    getDefaultOrg(): IOrganization {
        return this.defaultOrganization;
    }

    //=============================================================================
    // Private methods
    //==========================================================================

    private async syncDatabaseWithDefaults(): Promise<void> {
        if (process.env.DB_CLEARDB_ON_STARTUP === "true") {
            await this.orgRepo.clear();
            try {
                await this.orgRepo.query("ALTER SEQUENCE organization_entity_id_seq RESTART WITH 1;");
            } catch (error) {
                this.logger.warn("Failed to reset organization_entity_id_seq sequence:", error);
            }
        }

        const defaultOrgs: IOrganization[] = DEFAULT_ORGANIZATIONS;
        const existingOrgs = await this.orgRepo.find();
        const existingGuids = new Set<string>(existingOrgs.map((o) => o.guid));

        for (const org of defaultOrgs) {
            if (org && typeof org.guid === "string" && !existingGuids.has(org.guid)) {
                const newOrg = new OrganizationEntity();
                newOrg.updateFromDto(org);
                await this.orgRepo.save(newOrg);
                this.logger.log(`Added default organization: ${org.name} (${org.guid})`);
            }
        }
    }
}
