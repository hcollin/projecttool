import { ITextObject } from "../text/iText";
import { ETECHAPPLICATIONLAYER, ETECHCATEGORY } from "./eTechType";

export interface ITechnology extends ITextObject {
    guid: string;
    name: string;
    description?: string;
    category: ETECHCATEGORY[];
    appLayer: ETECHAPPLICATIONLAYER[];
}
