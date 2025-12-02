import { IText } from "@frosttroll/projecttoolmodels";
import { useEffect, useState } from "react";
import { apiGetText, apiGetTexts } from "./apiTexts";

let CACHED_KEYWORDS: string[] = [];
let KEYWORDS_LOADED = false;

/**
 * Load all texts from the backend API
 * @returns
 */
export const useTexts = (): { texts: IText[]; refreshTexts: () => Promise<void> } => {
    const [txts, setTxs] = useState<IText[]>([]);

    const fetchTexts = async () => {
        const texts = await apiGetTexts();
        setTxs(texts);
        if (!KEYWORDS_LOADED) {
            const keywordsSet = new Set<string>();
            texts.forEach((txt) => {
                if (txt.keywords && txt.keywords.length > 0) {
                    txt.keywords.forEach((kw) => keywordsSet.add(kw));
                }
            });
            CACHED_KEYWORDS = Array.from(keywordsSet);
            KEYWORDS_LOADED = true;
        }
    };
    useEffect(() => {
        fetchTexts();
    }, []);

    return { texts: txts, refreshTexts: fetchTexts };
};

/**
 * Load all keywords from all texts. This does not return duplicates and does not make a request to the backend unless necessary
 */
export const useKeywords = (): string[] => {
    const [keywords, setKeywords] = useState<string[]>(CACHED_KEYWORDS);

    useEffect(() => {
        if (keywords.length === 0 && !KEYWORDS_LOADED) {
            apiGetTexts().then((texts) => {
                const keywordsSet = new Set<string>();
                texts.forEach((txt) => {
                    if (txt.keywords && txt.keywords.length > 0) {
                        txt.keywords.forEach((kw) => keywordsSet.add(kw));
                    }
                });
                const kws = Array.from(keywordsSet);
                CACHED_KEYWORDS = kws;
                KEYWORDS_LOADED = true;
                setKeywords(kws);
            });
        }
    }, [keywords]);

    return keywords;
};

export const useText = (guid: string | null | undefined): IText | null => {
    const [txt, setTxt] = useState<IText | null>(null);

    useEffect(() => {
        if (guid) {
            apiGetText(guid || "")
                .then((t) => {
                    setTxt(t);
                })
                .catch(() => {
                    setTxt(null);
                });
        } else {
            setTxt(null);
        }
    }, [guid]);

    return txt;
};
