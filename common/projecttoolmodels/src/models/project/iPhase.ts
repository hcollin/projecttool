import { IRootObject } from "../IRootObject";

export interface IPhase extends IRootObject {
	name: string;
	description?: string;
	start: IPhaseStart;
	end: IPhaseEnd;
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

export interface IPhaseStart {
    ts?: number;
    atProjectStart?: boolean;
    afterPhaseGuid?: string;
    offsetInDays?: number;
}

export interface IPhaseEnd {
    ts?: number;
    atProjectEnd?: boolean;
    lengthInWorkingDays?: number;
    whenPhaseGuidStarts?: string;
    whenPhaseGuidEnds?: string;
	offsetInDays?: number;
}


export interface IPhaseAllocation {
	roleGuid: string;
	allocation: number; // percentage allocation (0-100)
}
