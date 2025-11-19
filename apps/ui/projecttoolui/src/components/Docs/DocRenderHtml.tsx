import { IDocFile, IDocFileHeader } from "@frosttroll/projecttoolmodels/";
import { Paper } from "@mantine/core";

interface DocRenderHtmlProps {
    doc: IDocFile;
}

const DocRenderHtml = (props: DocRenderHtmlProps) => {
    return (
        <Paper>
            {props.doc.content.map((contentItem, index) => {
                if (contentItem.type === "header") {
                    const header = contentItem as IDocFileHeader;
                    switch (header.level) {
                        case 1:
                            return <h1 key={index}>{header.text}</h1>;
                        case 2:
                            return <h2 key={index}>{header.text}</h2>;
                        case 3:
                            return <h3 key={index}>{header.text}</h3>;
                        default:
                            return <h4 key={index}>{header.text}</h4>;
                    }
                }
                return null;
            })}
        </Paper>
    );
};

export default DocRenderHtml;
