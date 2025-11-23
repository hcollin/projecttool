import { DateTime } from "luxon";
/**
 * Finnish public holidays for time calculations.
 * Each holiday is represented as [day, month].
 */
export const YEARLY_FIXED_HOLIDAYS = [
    [1, 1], // New Year's Day
    [6, 1], // Epiphany
    [1, 5], // May Day
    [6, 12], // Independence Day
    [24, 12], // Christmas Eve
    [25, 12], // Christmas Day
    [26, 12], // St. Stephen's Day
];
/**
 * Get Finnish public holidays for a specific year.
 * @param targetYear The year for which to get the holidays. Defaults to the current year if not provided.
 * @returns An array of tuples representing the holidays as [day, month].
 */
export function getFinnishPublicHolidaysForYear(targetYear) {
    const holidays = [...YEARLY_FIXED_HOLIDAYS];
    const year = targetYear ?? DateTime.now().year;
    // Calculate Easter-related holidays
    const easterSunday = calculateEasterSunday(year);
    const goodFriday = easterSunday.minus({ days: 2 });
    const easterMonday = easterSunday.plus({ days: 1 });
    const ascensionDay = easterSunday.plus({ days: 39 });
    // const pentecost = easterSunday.plus({ days: 49 });
    holidays.push([goodFriday.day, goodFriday.month]);
    holidays.push([easterMonday.day, easterMonday.month]);
    holidays.push([ascensionDay.day, ascensionDay.month]);
    // holidays.push([pentecost.day, pentecost.month]);
    // Midsummer Eve (Friday between June 19 and June 25)
    const june19 = DateTime.local(year, 6, 19);
    const june25 = DateTime.local(year, 6, 25);
    for (let dt = june19; dt <= june25; dt = dt.plus({ days: 1 })) {
        if (dt.weekday === 5) {
            holidays.push([dt.day, dt.month]);
            break;
        }
    }
    return holidays;
}
function calculateEasterSunday(year) {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 16);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 16);
    const k = c % 16;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return DateTime.local(year, month, day);
}
//# sourceMappingURL=holidays.js.map