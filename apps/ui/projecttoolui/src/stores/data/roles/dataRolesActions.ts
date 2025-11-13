import { DATA_PROJECT_ROLES } from "@frosttroll/projecttooldata";
import dataRolesStore from "./dataRolesStore";

export async function actionInitializeDataRoleTemplatesStore() {
	if (dataRolesStore.lastUpdated === -1 && dataRolesStore.roles.length === 0) {
		return await actionLoadDataRoleTemplates();
	}
	return Promise.resolve();
}

/**
 * Loads data role templates into the data roles store.
 *
 * Currently this function will load the role templates from the common/projecttoolsdata package.
 */
export async function actionLoadDataRoleTemplates() {
	dataRolesStore.roles = [...DATA_PROJECT_ROLES];
	dataRolesStore.lastUpdated = Date.now();
	return Promise.resolve();
}
