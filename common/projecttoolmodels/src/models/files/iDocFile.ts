import { IRootObject } from "../IRootObject";
import { IText } from "../text/iText";
import { EDOCLANG } from "./eDocLang";
import { EDOCTYPE } from "./eDocType";
import { EDOCITEMTYPE } from "./iDocItem";

export interface IDocFile extends IRootObject {
	type: EDOCTYPE;
	filename: string;
	language: EDOCLANG;
	createdAt: number;
	createdBy: string;
	content: IDocFileContent[];
}

export interface IDocFileContent {
	type: EDOCITEMTYPE;
	style?: string;

    // Targeting key is used to identify specific content items that can be populated automatically from project data
    targetingKey?: string;
    
    // If true, this content item is hidden in the final rendered document
    hidden?: boolean;
}

export interface IDocFileHeader extends IDocFileContent {
	type: EDOCITEMTYPE.HEADER;
	level: 1 | 2 | 3 | 4 | 5 | 6;
	text: string;
    number?: number;
}

export interface IDocFileParagraph extends IDocFileContent {
	type: EDOCITEMTYPE.PARAGRAPH;
	text: string;
}

/**
 * HTML content loaded from the backend /texts endpoint
 */
export interface IDocFileHtml extends IDocFileContent {
	type: EDOCITEMTYPE.HTML;
	key: string;
    text?: IText;
	useNameAsHeader?: number; // if set, will render the name of the text as a header of the given level before the HTML content
}

export interface IDocFileCover extends IDocFileContent {
	type: EDOCITEMTYPE.COVER;
	title: string;
	subtitle?: string;
	client?: string;
	writers?: string[];
}

export interface IDocFileTableOfContents extends IDocFileContent {
    type: EDOCITEMTYPE.TABLEOFCONTENTS;
    maxLevel: number;
}
export interface IDocFileList extends IDocFileContent {
	type: EDOCITEMTYPE.LIST;
	ordered: boolean;
	symbol?: string;
	items: string[];
}

export interface IDocFileKeyValue extends IDocFileContent {
	type: EDOCITEMTYPE.KEYVALUE;
	style?: "simple" | "table";
	items: [string, string | number | boolean][];
}

export interface IDocFileTable extends IDocFileContent {
	type: EDOCITEMTYPE.TABLE;
	headers: string[];
	rows: string[][];
}
