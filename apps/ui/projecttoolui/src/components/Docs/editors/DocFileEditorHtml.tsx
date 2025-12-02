import { IDocFileHtml, IText } from "@frosttroll/projecttoolmodels";
import { IDocFileEditorProps } from "../DocFileEditor";
import { Box, Flex, TextInput, Select } from "@mantine/core";
import { useState, useEffect } from "react";
import { apiGetText } from "../../../api/texts/apiTexts";
import TextPicker from "../../TextPicker/TextPicker";

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
export default DocFileEditorHtml;
