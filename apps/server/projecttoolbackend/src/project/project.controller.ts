// import { IProject } from "@frosttroll/projecttoolmodels";
import { Controller, Get } from "@nestjs/common";
import { IProjectBase } from "@frosttroll/projecttoolmodels";

@Controller("project")
export class ProjectController {
    @Get("all")
    async getAllProjects(): Promise<IProjectBase[]> {
        return Promise.resolve([]);
    }
}
