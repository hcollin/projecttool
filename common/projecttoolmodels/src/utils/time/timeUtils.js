import { DateTime } from "luxon";
import { getFinnishPublicHolidaysForYear } from "./holidays";
/**
 * Calculate the number of workdays (excluding weekends and Finnish public holidays) between two timestamps
 * @param start
 * @param end
 * @returns
 */
export function utilCalculateWorkdaysBetweenTimes(start, end, includeFinalDay, additionalHolidays) {
    let workdays = 0;
    let curDate = DateTime.fromMillis(start).startOf("day");
    const endDate = DateTime.fromMillis(end).startOf("day");
    let holidays = getFinnishPublicHolidaysForYear(curDate.year);
    let prevYear = curDate.year;
    while (includeFinalDay ? curDate <= endDate : curDate < endDate) {
        // Update holidays if year has changed
        if (curDate.year !== prevYear) {
            holidays = getFinnishPublicHolidaysForYear(curDate.year);
            prevYear = curDate.year;
        }
        const nd = [curDate.day, curDate.month];
        if (holidays.findIndex((h) => h[0] === nd[0] && h[1] === nd[1]) === -1) {
            // Not a holiday
            if (curDate.weekday !== 6 && curDate.weekday !== 7) {
                // Not a weekend
                if (!isAdditionalHoliday(curDate, additionalHolidays)) {
                    workdays++;
                }
            }
        }
        curDate = curDate.plus({ days: 1 });
    }
    return workdays;
}
const WORKDAYCACHE = new Map();
export function utilCalculatePlusWorkingDaysFromTs(start, workdaysToAdd, additionalHolidays) {
    const addLen = additionalHolidays ? `${additionalHolidays.length}` : "noadds";
    const cacheKey = `${start}-${workdaysToAdd}-${addLen}`;
    if (WORKDAYCACHE.has(cacheKey)) {
        return WORKDAYCACHE.get(cacheKey);
    }
    let curDate = DateTime.fromMillis(start).startOf("day");
    let holidays = getFinnishPublicHolidaysForYear(curDate.year);
    let prevYear = curDate.year;
    let addedWorkdays = 0;
    // console.log("\n\nAdding workdays from", curDate.toISODate(), "workdays to add:", workdaysToAdd);
    while (addedWorkdays < workdaysToAdd) {
        // console.log("\nDay: ", curDate.toISODate(), addedWorkdays, "/", workdaysToAdd);
        // Update holidays if year has changed
        if (curDate.year !== prevYear) {
            holidays = getFinnishPublicHolidaysForYear(curDate.year);
            prevYear = curDate.year;
        }
        const nd = [curDate.day, curDate.month];
        // console.log("Checking date:", nd);
        if (holidays.findIndex((h) => h[0] === nd[0] && h[1] === nd[1]) === -1) {
            // Not a holiday
            if (curDate.weekday !== 6 && curDate.weekday !== 7) {
                if (!isAdditionalHoliday(curDate, additionalHolidays)) {
                    addedWorkdays++;
                }
            }
            else {
                // console.log("It's a weekend!");
            }
        }
        else {
            // console.log("It's a holiday!");
        }
        if (addedWorkdays < workdaysToAdd) {
            curDate = curDate.plus({ days: 1 });
        }
        // console.log("Next day to check:", curDate.toISODate());
    }
    // console.log("Final date after adding workdays:", curDate.toISODate());
    WORKDAYCACHE.set(cacheKey, curDate.toMillis());
    return curDate.toMillis();
}
/**
 * Internal helper to check if a date is in the additional holidays list
 * @param date
 * @param additionalHolidays
 * @returns
 */
function isAdditionalHoliday(date, additionalHolidays) {
    if (!additionalHolidays) {
        return false;
    }
    const nd = [date.day, date.month];
    if (additionalHolidays.findIndex((h) => h[0] === nd[0] && h[1] === nd[1] && (h[2] === undefined || h[2] === date.year)) !== -1) {
        return true;
    }
    return false;
}
//# sourceMappingURL=timeUtils.js.map