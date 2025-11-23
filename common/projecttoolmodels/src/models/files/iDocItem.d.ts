export declare enum EDOCITEMTYPE {
    HEADER = "header",
    PARAGRAPH = "paragraph",
    KEYVALUE = "keyvalue",
    IMAGE = "image",
    LIST = "list",
    TABLE = "table"
}
/**
 * Reference for a document text entry. This is used to add texts to documents
 */
export interface IDocItem {
    type: EDOCITEMTYPE;
    key?: string;
    variant?: number;
    text?: string;
    vars?: (string | number | boolean)[];
}
//# sourceMappingURL=iDocItem.d.ts.map