import { EDOCLANG, EDOCTYPE } from "@frosttroll/projecttoolmodels";

import { PROJECTPLAN_EN } from "./projectplan/en";
import { IDocLang } from "./iDocLang";
import { PROJECTPLAN_FI } from "./projectplan/fi";

export function parseTxt(text: string, ...args: string[]): string {
    let parsedText = text;
    args.forEach((arg, index) => {
        const placeholder = `%${index + 1}`;
        parsedText = parsedText.replace(placeholder, arg);
    });
    return parsedText;
}

export function docTxt(key: string, language: EDOCLANG, doctype: EDOCTYPE, variant?: number): string {
    const texts = loadDocLanguageModule(language, doctype);
    const keys = key.split(".");

    if (texts === null) {
        console.warn(`No language module found for language ${language} and doctype ${doctype}`);
    }
    return getValueFromObject(texts as IDocLang, keys, variant || 0) || "";
}

// function parseKey(key: string): string[] {
//     return key.split(".");
// }

function loadDocLanguageModule(language: EDOCLANG, doctype: EDOCTYPE): IDocLang | null {
    if (doctype === EDOCTYPE.PROJECTPLAN) {
        if (language === EDOCLANG.EN) {
            return PROJECTPLAN_EN;
        }
        if (language === EDOCLANG.FI) {
            return PROJECTPLAN_FI;
        }
    }
    return null;
}

function getValueFromObject(langdata: IDocLang, keys: string[], variant: number): string | null {
    let current: IDocLang | string = langdata;
    for (const key of keys) {
        if (typeof current === "string" || current[key] === undefined) {
            return null;
        }
        if (Array.isArray(current[key])) {
            if (typeof current[key][variant] === "string") {
                return current[key][variant] as string;
            } else if (typeof current[key][0] === "string") {
                return current[key][0] as string;
            } else {
                console.warn(`No valid string found for key array ${key} with variant ${variant}`);
                return null;
            }
        }
        current = current[key];
    }
    return typeof current === "string" ? current : null;
}
