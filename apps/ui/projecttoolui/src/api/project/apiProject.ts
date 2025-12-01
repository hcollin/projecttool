import { IProject, IProjectBase, utilFixIProject, utilValidateIProject } from "@frosttroll/projecttoolmodels";
import { RestService } from "../RestService";

/**
 * This api returns a simplified list of all projects. If full project data is needed, use apiGetProject instead.
 *
 * NOTICE! If this data is needed in the app, use the useProjectsSimple hook instead of calling this function directly.
 * @returns
 */
export async function apiGetSimpleProjectList(): Promise<IProjectBase[]> {
	const rest = RestService.getInstance();
	const projects = await rest.GET<IProjectBase[]>("/project/all");
	return projects;
}

export async function apiGetProject(guid: string): Promise<IProject> {
	const rest = RestService.getInstance();
	const res = await rest.GET<IProject>(`/project/${guid}`);
	if (res) {
		return Promise.resolve(fixProjectResponse(res as IProject));
	}
	return Promise.reject();
}

export async function apiPostCreateProject(projectData: Partial<IProject>): Promise<void> {
	const rest = RestService.getInstance();
	await rest.POST<Partial<IProject>>("/project", projectData);
	return Promise.resolve();
}

export async function apiPostCreateEmptyProject(): Promise<IProject> {
	const rest = RestService.getInstance();
	const res = await rest.POSTwithResponse<Partial<IProject>>("/project/empty");
	if (res) {
		return Promise.resolve(fixProjectResponse(res as IProject));
	}
	return Promise.reject();
}

export async function apiPostUpdateProject(projectData: IProject): Promise<IProject> {
	const rest = RestService.getInstance();
	const res = await rest.POSTwithResponse<IProject>(`/project/${projectData.guid}`, projectData);
	if (res) {
		return Promise.resolve(fixProjectResponse(res as IProject));
	}
	return Promise.reject();
}

/**
 * Delete a project by its GUID from the backend.
 * @param guid
 * @returns
 */
export async function apiDeleteProject(guid: string): Promise<void> {
	const rest = RestService.getInstance();
	await rest.DELETE<void>(`/project`, { guid: guid });
	return Promise.resolve();
}

export async function apiDeleteRoleFromProject(roleGuid: string): Promise<void> {
	const rest = RestService.getInstance();
	await rest.DELETE<void>(`/project/role/${roleGuid}`);
	return Promise.resolve();
}

function fixProjectResponse(res: IProject): IProject {
	if (!utilValidateIProject(res as IProject)) {
		const fixed = utilFixIProject(res as IProject);
		if (!utilValidateIProject(fixed)) {
			console.error("Invalid project data received from server:", res);
			throw new Error("Invalid project data received from server.");
		} else {
			return fixed;
		}
	}
	return res;
}

// export async function apiDeleteProject(guid: string): Promise<void> {
//     const rest = RestService.getInstance();
//     await rest.DELETE<void>(`/project/${guid}`);
//     return Promise.resolve();
// }
