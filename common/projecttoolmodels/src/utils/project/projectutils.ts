import { IProject } from "@frosttroll/models/models/project/iProject";
import { utilCalculatePhasePrice } from "./phaseUtils";
import { Duration } from "luxon";
import { utilCalculateWorkdaysBetweenTimes } from "../time/timeUtils";

export function utilCalculateProjectPrice(project: IProject): number {
    let price = 0;

    project.phases.forEach((phase) => {
        // const duration = utilCalulatePhaseDuration(phase, project, true);
        price += utilCalculatePhasePrice(phase, project);
        // phase.allocations.forEach((alloc) => {
        //     const role = project.roles.find((r) => r.guid === alloc.roleGuid);
        //     if (role) {
        //         const hourlyGroup = project.prices.hourlypricegroups.find((hg) => hg.guid === role.priceGroupId);
        //         if (hourlyGroup) {
        //             const allocPrice = hourlyGroup.price * (alloc.allocation / 100) * duration * 7.5;

        //             price += allocPrice;
        //         } else {
        //             console.warn(`No hourly price group found for role ${role.name} in project ${project.codename}`);
        //         }
        //     } else {
        //         console.warn(
        //             `No role found for allocation with roleGuid ${alloc.roleGuid} in project ${project.codename}`
        //         );
        //     }
        // });
    });

    return price;
}

export function utilCalculateProjectDurationInDays(project: IProject): number {
    if (project.phases.length === 0) {
        return 0;
    }

    const dur = Duration.fromMillis(project.end - project.start);
    return Math.ceil(dur.as("days"));
}

export function utilCalculateProjectDurationInWorkDays(project: IProject): number {
    if (project.phases.length === 0) {
        return 0;
    }

    return utilCalculateWorkdaysBetweenTimes(project.start, project.end);
}
