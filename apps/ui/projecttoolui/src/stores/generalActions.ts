import { CURRENCY, IHourlyPriceGroup, IProject, IPhase } from "@frosttroll/projecttoolmodels";
import { generateRandomProjectName } from "@frosttroll/projecttoolutils";
import { actionSetActiveProject } from "./activeproject/activeProjectActions";
import userStore from "./user/userStore";
import { rnd } from "rndlib";

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
        start: Date.now(),
        teams: [],
        roles: [],
        prices: {
            hourlypricegroups: [defaultPriceGroup],
            fixedprices: [],
        },
        phases: [],
    };

    const phase1: IPhase = {
        guid: `project-${p.guid}phase-${Date.now()}`,
        organizationId: p.organizationId,
        name: "Phase 1",
        start: {
            atProjectStart: true,
        },
        end: {
            lengthInWorkingDays: 20,
        },
        allocations: [],
    };

    p.phases.push(phase1);

    actionSetActiveProject(p);
}
