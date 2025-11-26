import { IProject } from "@frosttroll/projecttoolmodels";
import { utilCalculatePhasePrice } from "./phaseUtils";
import { DateTime, Duration } from "luxon";
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

    return utilCalculateWorkdaysBetweenTimes(project.start, project.end, false, project.holidays || []);
}

export function utilGetProjectYears(project: IProject): number[] {
    const start = DateTime.fromMillis(project.start);
    const end = DateTime.fromMillis(project.end);

    const years: number[] = [];
    for (let y = start.year; y <= end.year; y++) {
        years.push(y);
    }

    return years;
}

export function utilValidateIProject(project: IProject): boolean {
    const mandatoryFields: Array<keyof IProject> = [
        "guid",
        "organizationId",
        "codename",
        "start",
        "end",
        "roles",
        "prices",
        "phases",
        "currency",
        "flags",
    ];

    for (const field of mandatoryFields) {
        if (project[field] === undefined || project[field] === null) {
            return false;
        }
    }

    // Following values must be numbers not strings
    const numberFields: Array<keyof IProject> = ["start", "end"];

    for (const field of numberFields) {
        if (typeof project[field] !== "number") {
            return false;
        }
    }

    // There must be at least on phase
    if (project.phases.length === 0) {
        return false;
    }

    return true;
}

export function utilFixIProject(project: IProject): IProject {
    const nproject = { ...project };
    if (typeof project.start === "string") {
        nproject.start = parseInt(project.start as unknown as string, 10);
    }
    if (typeof project.end === "string") {
        nproject.end = parseInt(project.end as unknown as string, 10);
    }

    return nproject;
}
