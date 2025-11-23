import { HOLIDAY_TUPLE } from "./holidays";
/**
 * Calculate the number of workdays (excluding weekends and Finnish public holidays) between two timestamps
 * @param start
 * @param end
 * @returns
 */
export declare function utilCalculateWorkdaysBetweenTimes(start: number, end: number, includeFinalDay: boolean, additionalHolidays: HOLIDAY_TUPLE[]): number;
export declare function utilCalculatePlusWorkingDaysFromTs(start: number, workdaysToAdd: number, additionalHolidays?: HOLIDAY_TUPLE[]): number;
//# sourceMappingURL=timeUtils.d.ts.map