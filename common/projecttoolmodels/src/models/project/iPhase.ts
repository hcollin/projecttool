import { IRootObject } from "../IRootObject";

export interface IPhase extends IRootObject {
    name: string;
    description?: string;
    start: IPhaseTime;
    end: IPhaseTime;
    allocations: IPhaseAllocation[];
}

export interface IPhaseTime {
    ts?: number;
    lengthInDays?: number;
    lengthInWorkingDays?: number;
    targetPhase?: {
        guid: string;
        type: "start" | "end";
    };
    atProjectStart?: boolean;
    atProjectEnd?: boolean;
}

export interface IPhaseAllocation {
    roleGuid: string;
    allocation: number; // percentage allocation (0-100)
}
