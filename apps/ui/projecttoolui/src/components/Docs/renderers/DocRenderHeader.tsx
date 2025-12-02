import { IDocFileHeader } from "@frosttroll/projecttoolmodels";
import { convertTextToId } from "../docUtils";

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

export const DocRenderHeaderCustom = (props: { level: number; children: string }) => {
    const { level, children } = props;
    const id = convertTextToId(children.toString());

    switch (level) {
        case 1:
            return <h1 id={id}>{children}</h1>;
        case 2:
            return <h2 id={id}>{children}</h2>;
        case 3:
            return <h3 id={id}>{children}</h3>;
        default:
            return <h4 id={id}>{children}</h4>;
    }
};

export default DocRenderHeader;
