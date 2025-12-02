import {
    EDOCITEMTYPE,
    IDocFileHeader,
    IDocFileHtml,
    IDocFileParagraph,
    IDocFileProjectResource,
} from "@frosttroll/projecttoolmodels";
import { IDocFileEditorProps } from "../DocFileEditor";
import { Flex, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const VALIDTYPESTOADD: EDOCITEMTYPE[] = [
    EDOCITEMTYPE.HEADER,
    EDOCITEMTYPE.PARAGRAPH,
    EDOCITEMTYPE.HTML,
    EDOCITEMTYPE.PRJRESOURCE,
];

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
            case EDOCITEMTYPE.PRJRESOURCE:
                const newProjectResource: IDocFileProjectResource = {
                    type: EDOCITEMTYPE.PRJRESOURCE,
                    resourceId: "",
                };
                props.onSave(newProjectResource);
                break;
            default:
                break;
        }
        return;
    }

    return (
        <Flex direction="row" align="center" justify="center" p="md" gap="sm">
            {VALIDTYPESTOADD.map((type) => {
                console.log("TYPE", type);
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
export default DocFileEditorUnknown;
