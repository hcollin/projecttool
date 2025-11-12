import { IProjectBase } from "./iProjectBase";


export interface IProject extends IProjectBase {

    teams: string[]; // List of team IDs (references to ITeam.guid)
}