import { EDOCITEMTYPE, IDocFileHeader } from "@frosttroll/projecttoolmodels";
import { IDocFileEditorProps } from "../DocFileEditor";
import { Stack, TextInput, Select } from "@mantine/core";

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

export default DocFileEditorHeader;
