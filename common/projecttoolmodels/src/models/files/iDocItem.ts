export enum EDOCITEMTYPE {
	// Default plain content types
	HEADER = "header",
	PARAGRAPH = "paragraph",
	KEYVALUE = "keyvalue",
	IMAGE = "image",
	LIST = "list",
	TABLE = "table",
	
	// Content types with special handling but no editable content and fairly simple in functionality
	COVER = "cover",
	TABLEOFCONTENTS = "tableofcontents",
	
	// Unknown type, used for empty items
	UNKNOWN = "unknown",

	// HTML content loaded from the backend /texts endpoint
	HTML = "html",

	// Project related content types
	PRJPHASE = "projectphase",
	PRJRESOURCE = "projectresource",
	PRJPRICEGROUP = "projectpricegroup",
	PRJTIMELINE = "projecttimeline",

	// Project charts and tables
	CHARTBUDGET = "chartbudget",

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
