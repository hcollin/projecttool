import { IPhase, IProject } from "@frosttroll/projecttoolmodels";
/**
 * Return the duration of a phase in days
 * @param phase
 * @param project
 */
export declare function utilCalculatePhaseDuration(phase: IPhase, project: IProject, inWorkDays?: boolean): number;
export declare function utilGetPhaseStartTs(phase: IPhase, project: IProject): number;
export declare function utilGetPhaseEndTs(phase: IPhase, project: IProject): number;
/**
 * Calculate a price for the given phase
 * @param phase
 * @param project
 * @returns
 */
export declare function utilCalculatePhasePrice(phase: IPhase, project: IProject): number;
/**
 * Calculate hours and price for a single day of the given phase
 * @param phase
 * @param project
 * @returns
 */
export declare function utilCalculatePhaseSingleDay(phase: IPhase, project: IProject): {
    hours: number;
    price: number;
    currency: string;
};
//# sourceMappingURL=phaseUtils.d.ts.map