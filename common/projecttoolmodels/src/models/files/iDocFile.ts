import { IRootObject } from "../IRootObject";
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
}

export interface IDocFileHeader extends IDocFileContent {
    type: EDOCITEMTYPE.HEADER;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
}

export interface IDocFileParagraph extends IDocFileContent {
    type: EDOCITEMTYPE.PARAGRAPH;
    text: string;
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
    items: [string, string|number|boolean][];
}

export interface IDocFileTable extends IDocFileContent {
    type: EDOCITEMTYPE.TABLE;
    headers: string[];
    rows: string[][];
}
