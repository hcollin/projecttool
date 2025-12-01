import { Controller, Get } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { IOrganization } from "@frosttroll/projecttoolmodels";

@Controller("organization")
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}

    @Get()
    async getAllOrganizations(): Promise<IOrganization[]> {
        return this.organizationService.getAllOrganizations();
    }
}
