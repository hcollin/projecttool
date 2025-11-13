import { IProject } from "common/projecttoolmodels/dist";
import activeProjectStore from "./activeProjectStore";


/**
 * Create a new unsaved project and set it as the active project.
 * @returns The newly created unsaved project.
 */
export function actionCreateNewProject(): IProject {
    const p: IProject = {
        guid: "new-unsaved-project",
        name: "New Project",
        organizationId: "default-organization",
        teams: [],
    };

    activeProjectStore.project = p;
    activeProjectStore.unsavedChanges = true;

    return p;
}



export function actionSaveActiveProject(): void {
    if (activeProjectStore.project) {
        activeProjectStore.unsavedChanges = false;
    }

}