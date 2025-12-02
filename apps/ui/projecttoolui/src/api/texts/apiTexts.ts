import { IText } from "@frosttroll/projecttoolmodels";
import { RestService } from "../RestService";

/**
 * Return a list of all texts from the backend API without the actual text content.
 */
export async function apiGetTexts(): Promise<IText[]> {
    const rest = RestService.getInstance();
    const texts = await rest.GET<IText[]>("/texts");
    return texts;
}

/**
 * Return a list of all texts from the backend API with full content. 
 * NOTICE! Do not use this method lightly as it can return a lot of data. Main use case for this is debugging and development.
 * @returns 
 */
export async function apiGetAllTextsFull(): Promise<IText[]> {
    const rest = RestService.getInstance();
    const texts = await rest.GET<IText[]>("/texts/fulllist");
    return texts;
}

/**
 * Get a single text by its GUID
 * @param guid
 * @returns
 */
export async function apiGetText(guid: string): Promise<IText> {
    const rest = RestService.getInstance();
    const text = await rest.GET<IText>(`/texts/${guid}`);
    return text;
}

/**
 * Update an existing text
 * @param text
 * @returns
 */
export async function apiPostUpdateText(text: IText): Promise<IText> {
    const rest = RestService.getInstance();
    const res = await rest.POSTwithResponse<IText>(`/texts/${text.guid}`, text);
    return res;
}

/**
 * Send a new text to be created in the backend
 * @param text
 * @returns
 */
export async function apiPostNewText(text: Partial<IText>): Promise<IText> {
    const rest = RestService.getInstance();
    const res = await rest.POSTwithResponse<IText>(`/texts`, text);
    return res;
}
