import { ETECHAPPLICATIONLAYER, ETECHCATEGORY } from "./eTechType";
export interface ITechnology {
    guid: string;
    name: string;
    description?: string;
    category: ETECHCATEGORY[];
    appLayer: ETECHAPPLICATIONLAYER[];
}
//# sourceMappingURL=iTechnology.d.ts.map