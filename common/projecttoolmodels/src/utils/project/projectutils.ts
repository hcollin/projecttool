import { IProject } from "@frosttroll/models/models/project/iProject";
import { utilCalculatePhasePrice } from "./phaseUtils";
import { Duration } from "luxon";
import { utilCalculateWorkdaysBetweenTimes } from "../time/timeUtils";

export function utilCalculateProjectPrice(project: IProject): number {
    let price = 0;

    project.phases.forEach((phase) => {
        price += utilCalculatePhasePrice(phase, project);
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
