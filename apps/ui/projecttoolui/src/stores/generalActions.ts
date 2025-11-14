import { CURRENCY, IHourlyPriceGroup, IProject } from "@frosttroll/projecttoolmodels";
import { generateRandomProjectName } from "@frosttroll/projecttoolutils";
import { actionSetActiveProject } from "./activeproject/activeProjectActions";
import userStore from "./user/userStore";

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
        guid: "new-unsaved-project",
        codename: generateRandomProjectName(),
        organizationId: "default-organization",
        teams: [],
        roles: [],
        prices: {
            hourlypricegroups: [defaultPriceGroup],
            fixedprices: [],
        },
    };

    actionSetActiveProject(p);
}
