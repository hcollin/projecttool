import { IProjectBase } from "@frosttroll/projecttoolmodels";
import { RestService } from "../RestService";

export async function apiGetSimpleProjectList(): Promise<IProjectBase[]> {
    const rest = RestService.getInstance();
    const projects = await rest.GET<IProjectBase[]>("/project/all");
    return projects;
}
