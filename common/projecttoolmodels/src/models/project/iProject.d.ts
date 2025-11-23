import { HOLIDAY_TUPLE } from "../../utils/time/holidays";
import { CURRENCY, IFixedPrice } from "../..";
import { IRole } from "../people/iRole";
import { IHourlyPriceGroup } from "../pricing/iHourlyPriceGroup";
import { IPhase } from "./iPhase";
import { IProjectBase } from "./iProjectBase";
export interface IProject extends IProjectBase {
    teams: string[];
    roles: IRole[];
    start: number;
    end: number;
    flags: string[];
    holidays?: HOLIDAY_TUPLE[];
    prices: {
        hourlypricegroups: IHourlyPriceGroup[];
        fixedprices: IFixedPrice[];
    };
    phases: IPhase[];
    targetBudget?: number;
    currency: CURRENCY;
    techStack: {
        frontend: string[];
        backend: string[];
        data: string[];
        platform: string[];
        tools: string[];
    };
}
//# sourceMappingURL=iProject.d.ts.map