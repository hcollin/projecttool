import { actionInitializeDataRoleTemplatesStore } from "./roles/dataRolesActions";
import { actionInitializeDataTechologiesStore } from "./tech/dateTechStoreActions";

/**
 * Initializes all data stores by loading their respective data.
 *
 * This function should be called during when a new project is created or an existing
 * project is loaded to ensure that all data stores are populated with the necessary data.
 */
export async function actionInitializeDataStores() {
	await actionInitializeDataRoleTemplatesStore();
	await actionInitializeDataTechologiesStore();
}
