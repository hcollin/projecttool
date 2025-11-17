import { DateTime } from "luxon";
import { getFinnishPublicHolidaysForYear } from "./holidays";

/**
 * Calculate the number of workdays (excluding weekends and Finnish public holidays) between two timestamps
 * @param start 
 * @param end 
 * @returns 
 */
export function utilCalculateWorkdaysBetweenTimes(start: number, end: number): number {
    let workdays = 0;

    let curDate = DateTime.fromMillis(start).startOf("day");
    const endDate = DateTime.fromMillis(end).startOf("day");

    let holidays = getFinnishPublicHolidaysForYear(curDate.year);
    let prevYear = curDate.year;

    while (curDate <= endDate) {
        // Update holidays if year has changed
        if (curDate.year !== prevYear) {
            holidays = getFinnishPublicHolidaysForYear(curDate.year);
            prevYear = curDate.year;
        }
        const nd: [number, number] = [curDate.day, curDate.month];
        if (holidays.findIndex((h) => h[0] === nd[0] && h[1] === nd[1]) === -1) {
            // Not a holiday
            if (curDate.weekday !== 6 && curDate.weekday !== 7) {
                // Not a weekend
                workdays++;
            }
        }
        curDate = curDate.plus({ days: 1 });
    }

    return workdays;
}
