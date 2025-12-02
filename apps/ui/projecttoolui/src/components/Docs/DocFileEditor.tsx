import { useState } from "react";
import { Button, Fieldset, Flex, Group } from "@mantine/core";
import { EDOCITEMTYPE, IDocFile, IDocFileContent } from "@frosttroll/projecttoolmodels";
import { IconTrash } from "@tabler/icons-react";
import ConfirmButton from "../ConfirmButton/ConfirmButton";

import DocFileEditorParagraph from "./editors/DocFileEditorParagraph";
import DocFileEditorHeader from "./editors/DocFileEditorHeader";
import DocFileEditorHtml from "./editors/DocFileEditorHtml";
import DocFileEditorUnknown from "./editors/DocFileEditorUnknown";
import DocFileEditorProjectResource from "./editors/DocFileEditorProjectResource";

export interface IDocFileEditorProps {
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
            {item.type === EDOCITEMTYPE.PRJRESOURCE && (
                <DocFileEditorProjectResource
                    {...props}
                    contentItem={item}
                    onSave={(item) => setItem(item as IDocFileContent)}
                />
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
