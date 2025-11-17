import { DateTime } from "luxon";
import { getFinnishPublicHolidaysForYear } from "./holidays";

/**
 * Calculate the number of workdays (excluding weekends and Finnish public holidays) between two timestamps
 * @param start
 * @param end
 * @returns
 */
export function utilCalculateWorkdaysBetweenTimes(start: number, end: number, includeFinalDay?: boolean): number {
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

const WORKDAYCACHE = new Map<string, number>();

export function utilCalculatePlusWorkingDaysFromTs(start: number, workdaysToAdd: number): number {
    if (WORKDAYCACHE.has(`${start}-${workdaysToAdd}`)) {
        return WORKDAYCACHE.get(`${start}-${workdaysToAdd}`)!;
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
        const nd: [number, number] = [curDate.day, curDate.month];
        // console.log("Checking date:", nd);
        if (holidays.findIndex((h) => h[0] === nd[0] && h[1] === nd[1]) === -1) {
            // Not a holiday
            if (curDate.weekday !== 6 && curDate.weekday !== 7) {
                // Not a weekend
                addedWorkdays++;
            } else {
                // console.log("It's a weekend!");
            }
        } else {
            // console.log("It's a holiday!");
        }

        if (addedWorkdays < workdaysToAdd) {
            curDate = curDate.plus({ days: 1 });
        }

        // console.log("Next day to check:", curDate.toISODate());
    }

    // console.log("Final date after adding workdays:", curDate.toISODate());
    WORKDAYCACHE.set(`${start}-${workdaysToAdd}`, curDate.toMillis());
    return curDate.toMillis();
}
