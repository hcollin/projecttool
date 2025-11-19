import { IDocFileHeader } from "@frosttroll/projecttoolmodels";

export function docH1(text: string): IDocFileHeader {
    return {
        type: "header",
        level: 1,
        text: text,
    };
}

export function docH2(text: string): IDocFileHeader {
    return {
        type: "header",
        level: 2,
        text: text,
    };
}

export function docH3(text: string): IDocFileHeader {
    return {
        type: "header",
        level: 3,
        text: text,
    };
}
