import { useEffect, useState } from "react";
import { Box, Button, Fieldset, Flex, Group, Select, Stack, Switch, Textarea, TextInput } from "@mantine/core";
import {
    EDOCITEMTYPE,
    IDocFile,
    IDocFileContent,
    IDocFileHeader,
    IDocFileHtml,
    IDocFileParagraph,
    IText,
} from "@frosttroll/projecttoolmodels";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import { apiGetText } from "../../api/texts/apiTexts";

import TextPicker from "../TextPicker/TextPicker";

interface IDocFileEditorProps {
    docFile: IDocFile;
    contentItem: IDocFileContent;
    onSave: (updatedContentItem: IDocFileContent) => void;
    onCancel: () => void;
    onDelete: (index?: number) => void;
}

const DocFileEditor = (props: IDocFileEditorProps) => {
    const [item, setItem] = useState<IDocFileContent>(props.contentItem);

    return (
        <Fieldset legend="Doc Item Editor" radius="md">
            {item.type === EDOCITEMTYPE.HEADER && (
                <DocFileEditorHeader
                    {...props}
                    contentItem={item}
                    onSave={(item) => setItem(item as IDocFileContent)}
                />
            )}
            {item.type === EDOCITEMTYPE.UNKNOWN && (
                <DocFileEditorUnknown
                    {...props}
                    contentItem={item}
                    onSave={(item) => setItem(item as IDocFileContent)}
                />
            )}
            {item.type === EDOCITEMTYPE.PARAGRAPH && (
                <DocFileEditorParagraph
                    {...props}
                    contentItem={item}
                    onSave={(item) => setItem(item as IDocFileContent)}
                />
            )}
            {item.type === EDOCITEMTYPE.HTML && (
                <DocFileEditorHtml {...props} contentItem={item} onSave={(item) => setItem(item as IDocFileContent)} />
            )}
            <Flex align="center" justify="space-between" gap="md" mt="md">
                <ConfirmButton
                    variant="filled"
                    color="red"
                    onClick={() => props.onDelete()}
                    leftSection={<IconTrash />}
                    question={`Delete this doc item?`}
                >
                    Delete
                </ConfirmButton>
                <Group>
                    <Button variant="outline" color="gray.5" onClick={() => props.onCancel()}>
                        Cancel
                    </Button>
                    <Button variant="filled" color="green.9" onClick={() => props.onSave(item)}>
                        Save
                    </Button>
                </Group>
            </Flex>
        </Fieldset>
    );
};

export default DocFileEditor;

/**
 * Edit a header content item
 * @param props
 * @returns
 */
const DocFileEditorHeader = (props: IDocFileEditorProps) => {
    const { contentItem } = props;

    if (contentItem.type !== EDOCITEMTYPE.HEADER) {
        console.error("Content item is not of type HEADER", contentItem);

        return null;
    }

    const header = contentItem as IDocFileHeader;

    function handleEdit(value: string) {
        const updatedHeader: IDocFileHeader = {
            ...header,
            text: value,
        };
        props.onSave(updatedHeader);
    }

    function handleChangeLevel(value: string) {
        const updatedHeader: IDocFileHeader = {
            ...header,
            level: parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6,
        };
        props.onSave(updatedHeader);
    }

    return (
        <Stack gap="sm">
            <TextInput
                label="Header Text"
                description="Edit the header text"
                value={header.text}
                onChange={(e) => handleEdit(e.currentTarget.value)}
            />
            <Select
                label="Header Level"
                description="Select the header level"
                value={header.level.toString()}
                onChange={(e) => handleChangeLevel(e!)}
                data={[
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                    { value: "6", label: "6" },
                ]}
            />
        </Stack>
    );
};

/**
 * Edit a paragraph content item
 * @param props
 * @returns
 */
const DocFileEditorParagraph = (props: IDocFileEditorProps) => {
    const { contentItem } = props;
    if (contentItem.type !== EDOCITEMTYPE.PARAGRAPH) {
        console.error("Content item is not of type PARAGRAPH", contentItem);
        return null;
    }

    const paragraph = contentItem as IDocFileParagraph;

    return (
        <Textarea
            label="Paragraph Text"
            description="Edit the paragraph text"
            value={paragraph.text}
            minRows={4}
            maxRows={10}
            autosize
            onChange={(e) => {
                const updatedParagraph: IDocFileParagraph = {
                    ...paragraph,
                    text: e.currentTarget.value,
                };
                props.onSave(updatedParagraph);
            }}
        />
    );
};

const DocFileEditorHtml = (props: IDocFileEditorProps) => {
    const { contentItem } = props;
    const item = contentItem as IDocFileHtml;

    const [txt, setTxt] = useState<IText | null>(() => {
        if (item.text) {
            return item.text;
        }
        return null;
    });

    const [guid, setGuid] = useState<string | null>(item.key || null);

    function loadText(guid: string) {
        apiGetText(guid).then((res) => {
            if (res) {
                setTxt(res);

                const updatedHtml: IDocFileHtml = {
                    ...item,
                    key: guid,
                    text: res,
                };
                props.onSave(updatedHtml);
            }
        });
    }

    useEffect(() => {
        console.log("Loading text for GUID", guid);
        if (guid) {
            loadText(guid);
        }
    }, [guid]);

    return (
        <Box>
            <Flex direction="row" align="flex-end" gap="md">
                <TextInput label="Text name" value={txt ? txt.name : ""} readOnly flex="1 1 auto" />

                <TextPicker
                    onSelect={(textGuid: string) => {
                        console.log("SELECTED TEXT GUID", textGuid);
                        setGuid(textGuid);
                    }}
                >
                    Change Text
                </TextPicker>

                <Select
                    label="Use name as header"
                    data={[
                        { value: "", label: "No header" },
                        { value: "1", label: "Header 1" },
                        { value: "2", label: "Header 2" },
                        { value: "3", label: "Header 3" },
                        { value: "4", label: "Header 4" },
                        { value: "5", label: "Header 5" },
                        { value: "6", label: "Header 6" },
                    ]}
                    value={item.useNameAsHeader ? item.useNameAsHeader.toString() : ""}
                    onChange={(value) => {
                        const updatedHtml: IDocFileHtml = {
                            ...item,
                            useNameAsHeader: value ? (parseInt(value) as 1 | 2 | 3 | 4 | 5 | 6) : undefined,
                        };
                        props.onSave(updatedHtml);
                    }}
                />
            </Flex>
        </Box>
    );
};

const VALIDTYPESTOADD: EDOCITEMTYPE[] = [EDOCITEMTYPE.HEADER, EDOCITEMTYPE.PARAGRAPH, EDOCITEMTYPE.HTML];

/**
 * Edit unknown content item, which means that the type needs to be selected
 * @param props
 * @returns
 */
const DocFileEditorUnknown = (props: IDocFileEditorProps) => {
    function createDocType(type: EDOCITEMTYPE) {
        console.log("Creating doc type", type);
        switch (type) {
            case EDOCITEMTYPE.HEADER:
                const newHeader: IDocFileHeader = {
                    type: EDOCITEMTYPE.HEADER,
                    text: "New Header",
                    level: 1,
                };
                props.onSave(newHeader);
                break;
            case EDOCITEMTYPE.PARAGRAPH:
                const newParagraph: IDocFileParagraph = {
                    type: EDOCITEMTYPE.PARAGRAPH,
                    text: "New paragraph text.",
                };
                props.onSave(newParagraph);
                break;
            case EDOCITEMTYPE.HTML:
                const newHtml: IDocFileHtml = {
                    type: EDOCITEMTYPE.HTML,
                    key: "",
                };
                props.onSave(newHtml);
                break;
            default:
                break;
        }
        return;
    }

    return (
        <Flex direction="row" align="center" justify="center" p="md" gap="sm">
            {VALIDTYPESTOADD.map((type) => {
                return (
                    <Button
                        key={type}
                        variant="filled"
                        onClick={() => {
                            createDocType(type);
                        }}
                        leftSection={<IconPlus />}
                    >
                        {type.toUpperCase()}
                    </Button>
                );
            })}
        </Flex>
    );
};
