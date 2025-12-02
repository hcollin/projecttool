import {
    EDOCITEMTYPE,
    IDocFile,
    IDocFileHeader,
    IDocFileKeyValue,
    IDocFileHtml,
    IDocFileCover,
    IDocFileContent,
    IDocFileParagraph,
    IText,
    EDOCLANG,
} from "@frosttroll/projecttoolmodels";
import { ActionIcon, Box, Button, ButtonGroup, Flex, Paper, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { apiGetText } from "../../api/texts/apiTexts";
import { IconEdit, IconEye, IconEyeOff, IconQuestionMark, IconRefresh, IconRowInsertBottom } from "@tabler/icons-react";

import "./doc-render.css";
import DocFileEditor from "./DocFileEditor";
import { formatTs } from "../../utils/formatingUtils";

interface DocRenderHtmlProps {
    doc: IDocFile;
    hidePart: (contentItem: IDocFileContent) => void;
    addPart: (index: number) => void;
    updatePart: (index: number, contentItem: IDocFileContent) => void;
    deletePart: (index: number) => void;
    hideEditButtons: boolean;
}

const DocRenderHtml = (props: DocRenderHtmlProps) => {
    return (
        <Paper className="doc-render">
            {props.doc.content.map((contentItem, index) => {
                return <DocRenderContentItem key={index} contentItem={contentItem} index={index} {...props} />;
            })}
        </Paper>
    );
};

export default DocRenderHtml;

const DocRenderContentItem = (props: DocRenderHtmlProps & { contentItem: IDocFileContent; index: number }) => {
    const type = props.contentItem.type;
    const hidden = props.contentItem.hidden;

    const [edit, setEdit] = useState<boolean>(false);

    function handleSaveEdit(updatedContentItem: IDocFileContent) {
        props.updatePart(props.index, updatedContentItem);
        setEdit(false);
    }

    function deleteMe() {
        props.deletePart(props.index);
        setEdit(false);
    }

    return (
        <Box
            className={`doc-content-item doc-content-item-${type.toLowerCase()} ${hidden ? "hidden" : ""} ${edit ? "edit" : ""}`}
        >
            {type === EDOCITEMTYPE.HEADER && !edit && <DocRenderHeader header={props.contentItem as IDocFileHeader} />}
            {type === EDOCITEMTYPE.KEYVALUE && !edit && (
                <DocRenderKeyValueList list={props.contentItem as IDocFileKeyValue} />
            )}
            {type === EDOCITEMTYPE.HTML && !edit && <DocRenderHtmlBlock doc={props.contentItem as IDocFileHtml} />}
            {type === EDOCITEMTYPE.COVER && !edit && <DocRenderCover doc={props.contentItem as IDocFileCover} />}
            {type === EDOCITEMTYPE.TABLEOFCONTENTS && !edit && (
                <DocRenderTableOfContents
                    maxLevel={(props.contentItem as any).maxLevel}
                    docs={props.doc.content}
                    hidden={hidden || false}
                    lang={props.doc.language}
                />
            )}
            {type === EDOCITEMTYPE.UNKNOWN && !edit && (
                <DocRenderUnknown doc={props.contentItem} onClick={() => setEdit(true)} />
            )}
            {type === EDOCITEMTYPE.PARAGRAPH && !edit && (
                <DocRenderParagraph paragraph={props.contentItem as IDocFileParagraph} />
            )}
            {edit && (
                <DocFileEditor
                    docFile={props.doc}
                    contentItem={props.contentItem}
                    onSave={(item) => handleSaveEdit(item)}
                    onCancel={() => setEdit(false)}
                    onDelete={() => deleteMe()}
                />
            )}
            {props.hideEditButtons === false && type !== EDOCITEMTYPE.UNKNOWN && (
                <DocActionButtons {...props} toggleEdit={() => setEdit(!edit)} editing={edit} />
            )}
        </Box>
    );
};

interface IDocEditProps extends DocRenderHtmlProps {
    contentItem: IDocFileContent;
    index: number;
    toggleEdit: () => void;
    editing?: boolean;
}

const DocActionButtons = (props: IDocEditProps) => {
    const hidden = props.contentItem.hidden;

    function handleAddPart() {
        props.addPart(props.index);
    }

    return (
        <ButtonGroup className="edit-doc-button-group" style={{ float: "right", display: "inline-block" }}>
            <Button variant={props.editing ? "filled" : "filled"} size="xs" onClick={() => props.toggleEdit()}>
                <IconEdit size={16} />
            </Button>
            <Button
                variant="filled"
                size="xs"
                color={hidden ? "gray.7" : "green.9"}
                onClick={() => props.hidePart(props.contentItem)}
                disabled={props.editing}
            >
                {hidden ? <IconEyeOff size={16} /> : <IconEye size={16} />}
            </Button>
            <Button variant="filled" size="xs" color="blue" onClick={() => handleAddPart()}>
                <IconRowInsertBottom size={16} />
            </Button>
        </ButtonGroup>
    );
};

const DocRenderHeader = (props: { header: IDocFileHeader }) => {
    const { header } = props;
    const id = convertTextToId(header.text);

    switch (header.level) {
        case 1:
            return <h1 id={id}>{header.text}</h1>;
        case 2:
            return <h2 id={id}>{header.text}</h2>;
        case 3:
            return <h3 id={id}>{header.text}</h3>;
        default:
            return <h4 id={id}>{header.text}</h4>;
    }
};

const DocRenderParagraph = (props: { paragraph: IDocFileParagraph }) => {
    return <p>{props.paragraph.text}</p>;
};

const DocRenderKeyValueList = (props: { list: IDocFileKeyValue }) => {
    if (props.list.style === "table") {
        return null;
    }

    return (
        <ul>
            {props.list.items.map((item, index) => (
                <li key={index}>
                    <strong>{item[0]}:</strong> {item[1]}
                </li>
            ))}
        </ul>
    );
};

const DocRenderUnknown = (props: { doc: IDocFileContent; onClick: () => void }) => {
    return (
        <Button
            className="unknown-doc-content"
            onClick={props.onClick}
            variant="light"
            fullWidth
            p="xs"
            size="xl"
            leftSection={<IconQuestionMark size={32} />}
        >
            Click to edit unknown content type
        </Button>
    );
};

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

            <div dangerouslySetInnerHTML={{ __html: txt.content }}></div>
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

const DocRenderCover = (props: { doc: IDocFileCover }) => {
    return (
        <>
            <h1 className="main-title" style={{ fontSize: "3rem" }}>
                {props.doc.title}
            </h1>
            {props.doc.subtitle && (
                <h2 className="sub-title" style={{ fontSize: "2rem" }}>
                    {props.doc.subtitle}
                </h2>
            )}
            {props.doc.client && <h3>Client: {props.doc.client}</h3>}
            {props.doc.writers && <h3>Writers: {props.doc.writers.join(", ")}</h3>}
        </>
    );
};

const DocRenderTableOfContents = (props: {
    maxLevel: number;
    docs: IDocFileContent[];
    hidden: boolean;
    lang: EDOCLANG;
}) => {
    const headers = props.docs.filter((doc) => {
        if (doc.type !== EDOCITEMTYPE.HEADER) {
            return false;
        }
        const header = doc as IDocFileHeader;
        return header.level <= props.maxLevel;
    }) as IDocFileHeader[];

    const titleText = props.lang === EDOCLANG.FI ? "Sisällysluettelo" : "Table of Contents";

    return (
        <>
            <h1>{titleText}</h1>
            {!props.hidden && (
                <ul>
                    {headers.map((header, index) => (
                        <li key={index} style={{ marginLeft: (header.level - 1) * 20 }}>
                            <a href={`#${convertTextToId(header.text)}`}>{header.text}</a>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

function convertTextToId(text: string): string {
    return text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}
