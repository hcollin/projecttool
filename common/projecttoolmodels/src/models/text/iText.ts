import { IRootObject } from "../IRootObject";

export interface IText extends IRootObject {
    // Actual text content
    content: string;

    // Keywords associated with the text that can be used for searching or categorization
    keywords: string[];

    // Name or title of the text used when selecting from a list
    name: string;

    // Language code of the text (e.g., "en" for English, "fr" for French)
    language: string;

    // Mapping for different language versions of the text
    langlinks?: Record<string, string>;

    metadata?: ITextMetaData;
}

export interface ITextObject {
    // List of exisiting text GUIDs associated with this object
    texts?: string[];
}


export interface ITextMetaData {
    createdAt: number;
    createdBy: string;
    updatedAt?: number;
    updatedBy?: string;
    contentLength: number;
}