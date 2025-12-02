import {
    CURRENCY,
    EDOCLANG,
    EDOCTYPE,
    IDocFile,
    IDocFileProjectResource,
    IProject,
    utilCurrencyToSymbol,
} from "@frosttroll/projecttoolmodels";
import { Text } from "@mantine/core";
import { DocRenderHeaderCustom } from "./DocRenderHeader";
import { docTxt } from "../langs/docLanguage";

import { DocFileRenderCustomHtml } from "./DocRenderHtmlBlock";

const DocRenderProjectResource = (props: { doc: IDocFileProjectResource; project: IProject; docfile: IDocFile }) => {
    const role = props.project.roles.find((r) => r.guid === props.doc.resourceId);

    const headerLevel = props.doc.headerLevel ? props.doc.headerLevel : -1;

    if (!role) {
        return <Text>Project Resource not found</Text>;
    }

    const priceGroup = props.project.prices.hourlypricegroups.find((pg) => pg.guid === role.priceGroupId);

    return (
        <>
            {headerLevel === -1 && <Text fw="bold">{role.name}</Text>}
            {headerLevel > 0 && <DocRenderHeaderCustom level={headerLevel}>{role.name}</DocRenderHeaderCustom>}
            {props.doc.showPrice && (
                <Text>
                    {docTxt("resource.hourlyprice", props.docfile.language as EDOCLANG, EDOCTYPE.PROJECTPLAN)} :
                    {priceGroup ? priceGroup.price : "Pricegroup not found!"}{" "}
                    {utilCurrencyToSymbol(props.project.currency as CURRENCY)}
                </Text>
            )}
            <DocFileRenderCustomHtml contentKey={props.doc.textGuid || ""} />
        </>
    );
};

export default DocRenderProjectResource;
