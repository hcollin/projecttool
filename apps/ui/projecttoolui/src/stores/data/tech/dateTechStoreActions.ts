// import { DATA_TECHNOLOGIES } from "@frosttroll/projecttooldata";
import techStore from "./dataTechStore";
import { ITechnology } from "@frosttroll/projecttoolmodels";
import { RestService } from "../../../api/RestService";

export async function actionInitializeDataTechologiesStore() {
	if (techStore.lastUpdated === -1 && techStore.technologies.length === 0) {
		return await actionLoadDataTechnologies();
	}
	return Promise.resolve();
}

/**
 * Loads data technologies into the data technologies store.
 *
 * Currently this function will load the technologies from the common/projecttoolsdata package.
 */
export async function actionLoadDataTechnologies() {
	const restService = RestService.getInstance();
	const technologies = await restService.GET<ITechnology[]>("/technology");

	techStore.technologies = [...technologies];
	techStore.lastUpdated = Date.now();
	return Promise.resolve();
}

/**
 * Retrieves a technology by its ID.
 * @param id
 * @returns
 */
export function actionGetDataTechnologyById(id: string) {
	return techStore.technologies.find((r) => r.guid === id) || null;
}
