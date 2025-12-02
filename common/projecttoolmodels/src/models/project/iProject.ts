import { HOLIDAY_TUPLE } from "../../utils/time/holidays";
import { CURRENCY, IDocFile, IFixedPrice } from "../..";
import { IRole } from "../people/iRole";
import { IHourlyPriceGroup } from "../pricing/iHourlyPriceGroup";
import { IPhase } from "./iPhase";
import { IProjectBase } from "./iProjectBase";

export interface IProject extends IProjectBase {
    roles: IRole[];
    start: number; // timestamp
    end: number; // timestamp
    flags: string[]; // list of project flags/labels
    holidays?: HOLIDAY_TUPLE[]; // list of [day, month] tuples that are considered holidays in addition to weekends and public holidays
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
    docs?: {
        projectplan?: IDocFile | null;
        solutionplan?: IDocFile | null;
        [key: string]: IDocFile | null | undefined;
    };
}
