import { IDocFileKeyValue } from "@frosttroll/projecttoolmodels";

const DocRenderKeyValueList = (props: { list: IDocFileKeyValue }) => {
    if (props.list.style === "table") {
        return null;
    }

    return (
        <ul>
            {props.list.items.map((item, index) => (
                <li key={index}>
                    <strong>{item[0]}:</strong> {item[1]}
                </li>
            ))}
        </ul>
    );
};
export default DocRenderKeyValueList;