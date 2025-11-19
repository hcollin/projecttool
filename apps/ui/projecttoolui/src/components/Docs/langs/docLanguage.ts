import { EDOCLANG, EDOCTYPE } from "@frosttroll/projecttoolmodels";

import { PROJECTPLAN_EN } from "./projectplan/en";
import { IDocLang } from "./iDocLang";

export function docTxt(key: string, language: EDOCLANG, doctype: EDOCTYPE): string {
    const texts = loadDocLanguageModule(language, doctype);
    const keys = key.split(".");

    if (texts === null) {
        console.warn(`No language module found for language ${language} and doctype ${doctype}`);
    }
    return getValueFromObject(texts as IDocLang, keys) || "";
}

// function parseKey(key: string): string[] {
//     return key.split(".");
// }

function loadDocLanguageModule(language: EDOCLANG, doctype: EDOCTYPE): IDocLang | null {
    if (doctype === EDOCTYPE.PROJECTPLAN) {
        if (language === EDOCLANG.EN) {
            return PROJECTPLAN_EN;
        }
    }
    return null;
}

function getValueFromObject(langdata: IDocLang, keys: string[]): string | null {
    let current: IDocLang | string = langdata;
    for (const key of keys) {
        if (typeof current === "string" || current[key] === undefined) {
            return null;
        }
        current = current[key];
    }
    return typeof current === "string" ? current : null;
}
