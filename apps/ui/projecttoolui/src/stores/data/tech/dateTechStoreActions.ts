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
    // Do not reload if the store is still valid
    if (storeStillValid(techStore)) {
        return Promise.resolve();
    }
    const restService = RestService.getInstance();
    const technologies = await restService.GET<ITechnology[]>("/technology");

    techStore.technologies = [...technologies];
    techStore.lastUpdated = Date.now();
    return Promise.resolve();
}

/**
 * Retrieves a technology by its GUID.
 * @param guid
 * @returns
 */
export async function actionGetDataTechnologyById(guid: string) {
    if (storeStillValid(techStore)) {
        const tech = techStore.technologies.find((t) => t.guid === guid);
        if (tech) {
            return tech;
        }
    }
    const restService = RestService.getInstance();
    const technology = await restService.GET<ITechnology>(`/technology/${guid}`);
    return technology;
}

/**
 * Update existing technology in the backend and reload the store.
 * @param tech
 * @returns
 */
export async function actionUpdateDataTechnology(tech: ITechnology) {
    const restService = RestService.getInstance();
    await restService.POST(`/technology/${tech.guid}`, tech);
    techStore.lastUpdated = -1; // Invalidate store to force reload
    return await actionLoadDataTechnologies();
}

/**
 * Send new technology to the backend and reload the store.
 *
 * @param tech
 * @returns
 */
export async function actionAddDataTechnology(tech: ITechnology) {
    const restService = RestService.getInstance();
    await restService.POST("/technology", tech);
    techStore.lastUpdated = -1; // Invalidate store to force reload
    return await actionLoadDataTechnologies();
}

function storeStillValid(store: typeof techStore): boolean {
    const CACHE_VALIDITY_DURATION_MS = 1 * 60 * 1000; // 1 minute
    const currentTime = Date.now();
    return currentTime - store.lastUpdated < CACHE_VALIDITY_DURATION_MS;
}
