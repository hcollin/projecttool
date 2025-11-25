import { IRoleTemplate } from "@frosttroll/projecttoolmodels";
import { Controller, Get } from "@nestjs/common";
import { RoletemplateService } from "./roletemplate.service";

@Controller("roletemplate")
export class RoletemplateController {
    constructor(private roletemplateService: RoletemplateService) {}

    @Get()
    async getAllRoletemplates(): Promise<IRoleTemplate[]> {
        return await this.roletemplateService.getAll();
    }
}
