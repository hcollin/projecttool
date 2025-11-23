import { IRootObject } from "../IRootObject";
import { CURRENCY } from "./eCurrency";
export interface IHourlyPriceGroup extends IRootObject {
    /**
     * Name of the price group.
     */
    name: string;
    /**
     * Hourly price for this price group.
     */
    price: number;
    /**
     * Currency for the price group.
     */
    currency?: CURRENCY;
    /**
     * Indicates if the price group is permanent and it cannot be deleted unless the whole project it is associated with is deleted.
     */
    permanent?: boolean;
}
//# sourceMappingURL=iHourlyPriceGroup.d.ts.map