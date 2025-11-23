import { CURRENCY, IFixedPrice, IHourlyPriceGroup } from "@frosttroll/projecttoolmodels";
import { proxy } from "valtio";

interface IDataPriceStore {
    hourlyPriceGroups: IHourlyPriceGroup[];
    fixedPrices: IFixedPrice[];
    validCurrencies: CURRENCY[];
}

const dataPriceStore = proxy<IDataPriceStore>({
    hourlyPriceGroups: [],
    fixedPrices: [],
    validCurrencies: [CURRENCY.EUR],
});

export default dataPriceStore;
