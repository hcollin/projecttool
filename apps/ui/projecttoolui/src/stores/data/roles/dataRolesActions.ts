import dataRolesStore from "./dataRolesStore";
import { RestService } from "../../../api/RestService";
import { IRoleTemplate } from "@frosttroll/projecttoolmodels";

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
    const rest = RestService.getInstance();
    const res = await rest.GET<IRoleTemplate[]>("/roletemplate");
    dataRolesStore.roles = [...res];
    dataRolesStore.lastUpdated = Date.now();
    return Promise.resolve();
}

/**
 * Retrieves a data role template by its ID.
 * @param id
 * @returns
 */
export function actionGetDataRoleTemplateById(id: string) {
    return dataRolesStore.roles.find((r) => r.guid === id) || null;
}
