import { IPhase, IProject } from "@frosttroll/projecttoolmodels";
import { DateTime, Duration } from "luxon";
import { utilCalculatePlusWorkingDaysFromTs, utilCalculateWorkdaysBetweenTimes } from "../time/timeUtils";

/**
 * Return the duration of a phase in days
 * @param phase
 * @param project
 */
export function utilCalculatePhaseDuration(phase: IPhase, project: IProject, inWorkDays?: boolean): number {
    let start: number = utilGetPhaseStartTs(phase, project);
    let end: number = utilGetPhaseEndTs(phase, project);

    if (end > start) {
        if (inWorkDays) {
            const workdays = utilCalculateWorkdaysBetweenTimes(start, end, true, project.holidays || []);
            // console.log(
            //     `Calculated workday duration for phase ${phase.name} in ${project.codename} from`,
            //     DateTime.fromMillis(start).toISODate(),
            //     "to",
            //     DateTime.fromMillis(end).toISODate(),
            //     "workdays:",
            //     workdays
            // );
            return workdays;
        }

        const dur = Duration.fromMillis(end - start);

        return dur.as("days");
    }

    console.warn(`Phase ${phase.name} has invalid start/end times`);

    return 0;
}

export function utilGetPhaseStartTs(phase: IPhase, project: IProject): number {
    let start: number = 0;

    if (phase.start.atProjectStart) {
        start = DateTime.fromMillis(project.start).startOf("day").toMillis();
    }
    if (phase.start.ts) {
        start = DateTime.fromMillis(phase.start.ts).startOf("day").toMillis();
    }
    if (phase.start.afterPhaseGuid) {
        const refPhase = project.phases.find((p) => p.guid === phase.start.afterPhaseGuid);
        if (refPhase) {
            const phaseEnd = utilGetPhaseEndTs(refPhase, project);
            start = phaseEnd;
        }
    }

    if (start === 0) {
        console.warn(`Phase ${phase.name} has no valid start, defaulting to project start`);
        start = DateTime.fromMillis(project.start).startOf("day").toMillis();
    }

    return DateTime.fromMillis(start)
        .plus({ days: phase.start.offsetInDays || 0 })
        .toMillis();
}

export function utilGetPhaseEndTs(phase: IPhase, project: IProject): number {
    let end: number = 0;

    if (phase.end.ts) {
        end = DateTime.fromMillis(phase.end.ts).startOf("day").toMillis();
    }

    if (phase.end.lengthInWorkingDays) {
        const startTs = utilGetPhaseStartTs(phase, project);
        return utilCalculatePlusWorkingDaysFromTs(startTs, phase.end.lengthInWorkingDays || 0, project.holidays || []);
    }

    if (phase.end.atProjectEnd) {
        end = DateTime.fromMillis(project.end).startOf("day").toMillis();
    }

    if (phase.end.whenPhaseGuidEnds) {
        const refPhase = project.phases.find((p) => p.guid === phase.end.whenPhaseGuidEnds);
        if (refPhase) {
            end = utilGetPhaseEndTs(refPhase, project);
        }
    }

    if (phase.end.whenPhaseGuidStarts) {
        const refPhase = project.phases.find((p) => p.guid === phase.end.whenPhaseGuidStarts);
        if (refPhase) {
            end = utilGetPhaseStartTs(refPhase, project);
        }
    }

    return DateTime.fromMillis(end)
        .plus({ days: phase.end.offsetInDays || 0 })
        .toMillis();
}

/**
 * Calculate a price for the given phase
 * @param phase
 * @param project
 * @returns
 */
export function utilCalculatePhasePrice(phase: IPhase, project: IProject): number {
    const workDays = utilCalculatePhaseDuration(phase, project, true);
    let price = 0;

    phase.allocations.forEach((alloc) => {
        const role = project.roles.find((r) => r.guid === alloc.roleGuid);
        if (role) {
            const hourlyGroup = project.prices.hourlypricegroups.find((hg) => hg.guid === role.priceGroupId);
            if (hourlyGroup) {
                const allocPrice = hourlyGroup.price * (alloc.allocation / 100) * workDays * 7.5;

                price += allocPrice;
            } else {
                console.warn(`No hourly price group found for role ${role.name} in project ${project.codename}`);
            }
        } else {
            console.warn(`No role found for allocation with roleGuid ${alloc.roleGuid} in project ${project.codename}`);
        }
    });

    return price;
}

/**
 * Calculate hours and price for a single day of the given phase
 * @param phase
 * @param project
 * @returns
 */
export function utilCalculatePhaseSingleDay(
    phase: IPhase,
    project: IProject
): { hours: number; price: number; currency: string } {
    const response = {
        hours: 0,
        price: 0,
        currency: "",
    };

    phase.allocations.forEach((alloc) => {
        const role = project.roles.find((r) => r.guid === alloc.roleGuid);
        if (role) {
            // Calculate hours for one day
            const hours = 7.5 * (alloc.allocation / 100);
            response.hours += hours;

            // Calculate price for one day
            const hourlyGroup = project.prices.hourlypricegroups.find((hg) => hg.guid === role.priceGroupId);
            if (hourlyGroup) {
                const price = hourlyGroup.price * hours;

                response.price += price;
                response.currency = project.currency;
            } else {
                console.warn(`No hourly price group found for role ${role.name} in project ${project.codename}`);
            }
        } else {
            console.warn(`No role found for allocation with roleGuid ${alloc.roleGuid} in project ${project.codename}`);
        }
    });
    return response;
}
