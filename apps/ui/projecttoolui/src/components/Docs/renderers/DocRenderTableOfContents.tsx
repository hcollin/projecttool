import { EDOCITEMTYPE, EDOCLANG, IDocFileContent, IDocFileHeader } from "@frosttroll/projecttoolmodels";
import { convertTextToId } from "../docUtils";

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
export default DocRenderTableOfContents;
