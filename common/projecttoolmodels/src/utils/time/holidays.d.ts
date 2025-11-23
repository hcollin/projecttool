/**
 * Type representing a holiday as [day, month, year?]
 */
export type HOLIDAY_TUPLE = [number, number, number?];
/**
 * Finnish public holidays for time calculations.
 * Each holiday is represented as [day, month].
 */
export declare const YEARLY_FIXED_HOLIDAYS: HOLIDAY_TUPLE[];
/**
 * Get Finnish public holidays for a specific year.
 * @param targetYear The year for which to get the holidays. Defaults to the current year if not provided.
 * @returns An array of tuples representing the holidays as [day, month].
 */
export declare function getFinnishPublicHolidaysForYear(targetYear?: number): HOLIDAY_TUPLE[];
//# sourceMappingURL=holidays.d.ts.map