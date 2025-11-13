import { IProject } from "common/projecttoolmodels/dist";
import { generateRandomProjectName } from "@frosttroll/projecttoolutils";
import activeProjectStore from "./activeProjectStore";

/**
 * Create a new unsaved project and set it as the active project.
 * @returns The newly created unsaved project.
 */
export function actionCreateNewProject(): IProject {
	const p: IProject = {
		guid: "new-unsaved-project",
		codename: generateRandomProjectName(),
		organizationId: "default-organization",
		teams: [],
	};

	activeProjectStore.project = p;
	activeProjectStore.unsavedChanges = true;

	return p;
}

/**
 * Simulate saving the active project by resetting the unsavedChanges flag.
 */
export function actionSaveActiveProject(): void {
	if (activeProjectStore.project) {
		activeProjectStore.unsavedChanges = false;
	}
}


/**
 * Update the active project in the store with the provided project object.
 * @param project 
 */
export function actionUpdateActiveProject(project: IProject): void {
    activeProjectStore.project = {...project};
    activeProjectStore.unsavedChanges = true;
}