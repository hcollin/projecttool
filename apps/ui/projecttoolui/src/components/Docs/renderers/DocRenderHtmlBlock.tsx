import { useEffect, useState } from "react";
import { Flex, ActionIcon, Text } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import DOMPurify from "dompurify";

import { EDOCITEMTYPE, IDocFileHeader, IDocFileHtml, IText } from "@frosttroll/projecttoolmodels";

import DocRenderHeader from "./DocRenderHeader";

import { apiGetText } from "../../../api/texts/apiTexts";

import { formatTs } from "../../../utils/formatingUtils";

const DocRenderHtmlBlock = (props: { doc: IDocFileHtml }) => {
    const [txt, setTxt] = useState<IText | null>(props.doc.text || null);
    const [state, setState] = useState<boolean | string>(false);

    function loadText(key: string) {
        setState("Loading...");
        apiGetText(key).then((res) => {
            if (res) {
                setTxt(res);
                setState(true);
            } else {
                setTxt(null);
                setState("Failed to load txt");
            }
        });
    }

    useEffect(() => {
        if (props.doc.key && !txt) {
            loadText(props.doc.key);
        }
    }, [props.doc.key]);

    if (txt === null) {
        return <p>Loading...</p>;
    }

    if (typeof state === "string") {
        return <p>{state}</p>;
    }

    const headerDoc: IDocFileHeader | null =
        props.doc.useNameAsHeader && txt
            ? ({ type: EDOCITEMTYPE.HEADER, level: props.doc.useNameAsHeader || 4, text: txt.name } as IDocFileHeader)
            : null;

    return (
        <>
            {headerDoc && <DocRenderHeader header={headerDoc} />}

            <SafeHtml html={txt.content} />
            <Flex justify="flex-start" mt="sm" align="center">
                <ActionIcon size="sm" onClick={() => loadText(props.doc.key!)}>
                    <IconRefresh size={16} />
                </ActionIcon>
                <Text ml="sm" size="xs" fs="italic">
                    {txt.name}
                </Text>
                <Text ml="sm" size="xs" fs="italic">
                    {txt.language.toUpperCase()}
                </Text>
                {txt.metadata && (
                    <Text ml="sm" size="xs" fs="italic">
                        {formatTs(txt.metadata.updatedAt || txt.metadata.createdAt)}
                    </Text>
                )}
            </Flex>
        </>
    );
};

export default DocRenderHtmlBlock;

export const DocFileRenderCustomHtml = (props: { contentKey: string }) => {
    
    if(!props.contentKey) {
        return null;
    }

    const doc = {
        type: EDOCITEMTYPE.HTML,
        key: props.contentKey,
        useNameAsHeader: 0,
    } as IDocFileHtml;

    return <DocRenderHtmlBlock doc={doc} />;
};

export const SafeHtml = ({ html }: { html: string }) => {
    const cleanHtml = DOMPurify.sanitize(html);
    return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};
