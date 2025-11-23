export enum EDOCITEMTYPE {
    HEADER = "header",
    PARAGRAPH = "paragraph",
    KEYVALUE = "keyvalue",
    IMAGE = "image",
    LIST = "list",
    TABLE = "table",
}

/**
 * Reference for a document text entry. This is used to add texts to documents
 */
export interface IDocItem {
    type: EDOCITEMTYPE;

    // Target document key for this text entry
    key?: string;

    // Target variant for the the key
    variant?: number;

    // Cusotom text to use instead of looking up from language files
    text?: string;

    // Replacement variables for the text lookup
    vars?: (string | number | boolean)[];
}
