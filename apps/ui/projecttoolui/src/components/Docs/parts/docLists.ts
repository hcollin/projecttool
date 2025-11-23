import { EDOCITEMTYPE, IDocFileKeyValue } from "@frosttroll/projecttoolmodels";



export function docKeyValueList(items: { key: string; value: string }[]): IDocFileKeyValue {


    const keyValueList: IDocFileKeyValue ={
        type: EDOCITEMTYPE.KEYVALUE,
        style: "simple",
        items: items.map(item => [item.key, item.value])
    };

    return keyValueList;
}