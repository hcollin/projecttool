import { IDocFileParagraph } from "@frosttroll/projecttoolmodels";

const DocRenderParagraph = (props: { paragraph: IDocFileParagraph }) => {
    return <p>{props.paragraph.text}</p>;
};

export default DocRenderParagraph;
