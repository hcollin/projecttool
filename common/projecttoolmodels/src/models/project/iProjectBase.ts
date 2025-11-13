import type { IRootObject } from "../IRootObject";


/**
 * IProjectBase contains the basic properties for the project. It does not include all the detailed information about its various parts.
 * 
 */
export interface IProjectBase extends IRootObject{
    codename: string;
    realname?: string;
    clientName?: string;
    

}