import { EDOCITEMTYPE, IDocFileParagraph } from "@frosttroll/projecttoolmodels";
import { IDocFileEditorProps } from "../DocFileEditor";
import { Textarea } from "@mantine/core";


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

export default DocFileEditorParagraph;