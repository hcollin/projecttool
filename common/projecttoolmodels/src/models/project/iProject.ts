import { IFixedPrice } from "../..";
import { IRole } from "../people/iRole";
import { IHourlyPriceGroup } from "../pricing/iHourlyPriceGroup";
import { IProjectBase } from "./iProjectBase";


export interface IProject extends IProjectBase {

    teams: string[]; // List of team IDs (references to ITeam.guid)
    roles: IRole[];
    prices: {
        hourlypricegroups: IHourlyPriceGroup[];
        fixedprices: IFixedPrice[];
    }
}