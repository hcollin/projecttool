import { DateTime } from "luxon";
import { IPhaseTime, IProject } from "../..";
import { getFinnishPublicHolidaysForYear } from "./holidays";

export function getTimeStampFromPhaseTime(phasetime: IPhaseTime, project: IProject): number | undefined {
	if (phasetime.ts !== undefined) {
		return phasetime.ts;
	}

	if (phasetime.atProjectStart) {
		return project.start;
	}

	if (phasetime.lengthInDays !== undefined) {
		const start = DateTime.fromMillis(project.start).startOf("day");
		return start.plus({ days: phasetime.lengthInDays }).toMillis();
	}

	if (phasetime.lengthInWorkingDays !== undefined) {
		const start = DateTime.fromMillis(project.start).startOf("day");

		// Calculate the number of working days to add, skipping weekends and holidays
		let daysAdded = 0;
		let currentDate = start;
		const holidays = getFinnishPublicHolidaysForYear(start.year);
		while (daysAdded < phasetime.lengthInWorkingDays) {
			currentDate = currentDate.plus({ days: 1 });
			const isWeekend = currentDate.weekday === 6 || currentDate.weekday === 7;
			const isHoliday = holidays.some(([day, month]) => day === currentDate.day && month === currentDate.month);
			if (!isWeekend && !isHoliday) {
				daysAdded++;
			}
		}

		return currentDate.toMillis();
	}

	if (phasetime.atProjectEnd) {
		if (project.end !== undefined) {
			return project.end;
		}

		if (project.phases.length > 0) {
			return Math.max(
				...project.phases.map((phase) => {
					const phaseEndTs = getTimeStampFromPhaseTime(phase.end, project);
					return phaseEndTs ? phaseEndTs : 0;
				}),
			);
		}
	}

	if (phasetime.targetPhase) {
		const targetPhase = project.phases.find((p) => p.guid === phasetime.targetPhase!.guid);
		if (targetPhase) {
			if (phasetime.targetPhase.type === "start") {
				return getTimeStampFromPhaseTime(targetPhase.start, project);
			}
			if (phasetime.targetPhase.type === "end") {
				return getTimeStampFromPhaseTime(targetPhase.end, project);
			}
		}
	}

	return undefined;
}

