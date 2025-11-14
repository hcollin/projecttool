import { IFixedPrice } from "../..";
import { IRole } from "../people/iRole";
import { IHourlyPriceGroup } from "../pricing/iHourlyPriceGroup";
import { IPhase } from "./iPhase";
import { IProjectBase } from "./iProjectBase";

export interface IProject extends IProjectBase {
    teams: string[]; // List of team IDs (references to ITeam.guid)
    roles: IRole[];
    start: number; // timestamp
    end?: number; // timestamp
    prices: {
        hourlypricegroups: IHourlyPriceGroup[];
        fixedprices: IFixedPrice[];
    };
    phases: IPhase[];
}
