import { CURRENCY, IHourlyPriceGroup, IProject, IPhase } from "@frosttroll/projecttoolmodels";
import { generateRandomProjectName } from "@frosttroll/projecttoolutils";
import { actionSetActiveProject } from "./activeproject/activeProjectActions";
import userStore from "./user/userStore";
import { rnd } from "rndlib";
import { DateTime } from "luxon";

/**
 * Create a new unsaved project. This creates the new project and all default sub-objects and sets this project to active.
 */
export function actionCreateNewProject() {
    // Create default pricegroup for this project

    const defaultPriceGroup: IHourlyPriceGroup = {
        guid: `pricegroup-default-${Date.now()}`,
        organizationId: userStore.organizationId,
        name: "Default",
        price: 90,
        currency: CURRENCY.EUR,
        permanent: true,
    };

    const p: IProject = {
        guid: `prj${rnd(100000, 999999)}`,
        codename: generateRandomProjectName(),
        organizationId: "default-organization",
        start: DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toMillis(),
        end: DateTime.now()
            .plus({ days: 60 })
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .setLocale("fi")
            .toMillis(),
        teams: [],
        roles: [],
        prices: {
            hourlypricegroups: [defaultPriceGroup],
            fixedprices: [],
        },
        phases: [],
        currency: CURRENCY.EUR,
        targetBudget: 0,
        flags: [],
        holidays: [],
    };

    const phase1: IPhase = {
        guid: `project-${p.guid}phase-${Date.now()}`,
        organizationId: p.organizationId,
        name: "Phase 1",
        start: {
            atProjectStart: true,
        },
        end: {
            atProjectEnd: true,
        },
        allocations: [],
    };

    p.phases.push(phase1);

    actionSetActiveProject(p);
}

export function actionStoreProjectToLocalStorage(project: IProject) {
    const existing = localStorage.getItem(`projecttool-projects`);
    if (existing) {
        console.log(`Updating project ${project.codename} in localStorage`);
        const projects = JSON.parse(existing) as IProject[];
        const index = projects.findIndex((p) => p.guid === project.guid);
        if (index !== -1) {
            projects[index] = project;
        } else {
            projects.push(project);
        }

        localStorage.setItem(`projecttool-projects`, JSON.stringify(projects));
    } else {
        console.log(`Storing new project ${project.codename} to localStorage`);
        localStorage.setItem(`projecttool-projects`, JSON.stringify([project]));
    }
}

export function actionLoadProjectsFromLocalStorage(): IProject[] {
    const existing = localStorage.getItem(`projecttool-projects`);
    if (existing) {
        return JSON.parse(existing) as IProject[];
    }
    return [];
}

export function actionDeleteProjectFromLocalStorage(projectGuid: string) {
    const existing = localStorage.getItem(`projecttool-projects`);
    if (existing) {
        const projects = JSON.parse(existing) as IProject[];
        const updatedProjects = projects.filter((p) => p.guid !== projectGuid);
        localStorage.setItem(`projecttool-projects`, JSON.stringify(updatedProjects));
    }
}
