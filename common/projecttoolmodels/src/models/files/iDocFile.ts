import { IRootObject } from "../IRootObject";
import { EDOCLANG } from "./eDocLang";
import { EDOCTYPE } from "./eDocType";

export interface IDocFile extends IRootObject {
    type: EDOCTYPE;
    filename: string;
    language: EDOCLANG;
    createdAt: number;
    createdBy: string;
    content: IDocFileContent[];
}

export interface IDocFileContent {
    type: "header" | "paragraph" | "list" | "table" | "image";
    style?: string;
}

export interface IDocFileHeader extends IDocFileContent {
    type: "header";
    level: 1 | 2 | 3 | 4 | 5 | 6;
    text: string;
}

export interface IDocFileParagraph extends IDocFileContent {
    type: "paragraph";
    text: string;
}
