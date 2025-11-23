import {
    CURRENCY,
    IProject,
    utilCalculatePhaseDuration,
    utilCalculatePhasePrice,
    utilCalculatePhaseSingleDay,
    utilCalculateWorkdaysBetweenTimes,
    utilGetPhaseEndTs,
    utilGetPhaseStartTs,
} from "@frosttroll/projecttoolmodels";
import { uRoleName } from "./formatingUtils";
import { DateTime } from "luxon";

interface IProjectRoleSummary {
    role: string;
    hourlyRate: number;
    currency: CURRENCY;
    phases: {
        [phaseName: string]: {
            hours: number;
            workdays: number;
            cost: number;
            allocation: number;
        };
    };
    totalHours: number;
    totalCost: number;
}

/**
 * Calculate project summary data per role
 * @param project
 * @returns
 */
export function uCalculateProjectSummary(project: IProject): IProjectRoleSummary[] {
    // const phaseTotalHours: number[] = [];
    // const phaseTotalCosts: number[] = [];

    const data: IProjectRoleSummary[] = project.roles.reduce((summaries, role) => {
        const summary: IProjectRoleSummary = {
            role: uRoleName(role),
            hourlyRate: 0,
            currency: project.currency,
            phases: {},
            totalHours: 0,
            totalCost: 0,
        };

        const priceGroup = project.prices.hourlypricegroups.find((hrpg) => hrpg.guid === role.priceGroupId);

        if (priceGroup) {
            summary.hourlyRate = priceGroup.price;
        }
        // Next columns are per phase
        let roleTotalHours = 0;
        let roleTotalCost = 0;
        project.phases.forEach((phase) => {
            const phaseSummary = {
                hours: 0,
                cost: 0,
                workdays: 0,
                allocation: 0,
            };
            const alloc = phase.allocations.find((a) => a.roleGuid === role.guid);
            if (alloc && alloc.allocation > 0) {
                phaseSummary.allocation = alloc.allocation;

                const days = utilCalculatePhaseDuration(phase, project, true);
                const hours = days * (7.5 * (alloc.allocation / 100));
                const cost = hours * summary.hourlyRate;

                phaseSummary.hours = hours;
                phaseSummary.cost = cost;
                phaseSummary.workdays = days * (alloc.allocation / 100);

                roleTotalHours += hours;
                roleTotalCost += cost;
            }
            summary.phases[phase.name] = phaseSummary;
        });
        // Final columns are totals

        summary.totalHours = roleTotalHours;
        summary.totalCost = roleTotalCost;

        summaries.push(summary);

        return summaries;
    }, [] as IProjectRoleSummary[]);

    return data;
}

export interface IProjectBudgetSummary {
    key: string;
    order: number;

    cost: number;
    cumulativeCost: number;

    hours: number;
    cumulativeHours: number;

    partsCost?: Record<string, number>;
    partsHours?: Record<string, number>;
}

/**
 * Calculate project budget summary grouped by phase
 * @param project
 * @returns
 */
export function uCalculateProjectBudgetSummaryGroupByPhase(project: IProject): IProjectBudgetSummary[] {
    const budgetSummary: IProjectBudgetSummary[] = [];

    let cumulativeCost = 0;
    let cumulativeHours = 0;

    project.phases.forEach((phase, index) => {
        const budgetItem: IProjectBudgetSummary = {
            key: phase.name,
            order: index + 1,
            cost: 0,
            cumulativeCost: 0,
            hours: 0,
            cumulativeHours: 0,
        };

        const phaseCost = utilCalculatePhasePrice(phase, project);
        budgetItem.cost = phaseCost;
        cumulativeCost += phaseCost;
        budgetItem.cumulativeCost = cumulativeCost;

        const phaseDurationDays = utilCalculatePhaseDuration(phase, project, true);
        const phaseHours = phaseDurationDays * 7.5;
        budgetItem.hours = phaseHours;
        cumulativeHours += phaseHours;
        budgetItem.cumulativeHours = cumulativeHours;

        budgetSummary.push(budgetItem);
    });

    return budgetSummary;
}

export function uCalculateProjectBudgetSummaryGroupByMonth(project: IProject): IProjectBudgetSummary[] {
    const budgetSummary: IProjectBudgetSummary[] = [];

    let cumulativeCost = 0;
    let cumulativeHours = 0;

    let curMonth = DateTime.fromMillis(project.start).startOf("month").startOf("day");
    const endMonth = DateTime.fromMillis(project.end).endOf("month").endOf("day");

    while (curMonth.toMillis() <= endMonth.toMillis()) {
        const monthKey = curMonth.toFormat("yyyy / MM");

        const mnthStart = curMonth.toMillis();
        const mnthEnd = DateTime.fromMillis(curMonth.toMillis()).endOf("month").endOf("day").toMillis();

        const budgetItem: IProjectBudgetSummary = {
            key: monthKey,
            order: budgetSummary.length + 1,
            cost: 0,
            cumulativeCost: 0,
            hours: 0,
            cumulativeHours: 0,
            partsCost: {},
            partsHours: {},
        };

        project.phases.forEach((phase) => {
            const phaseStart = utilGetPhaseStartTs(phase, project);
            const phaseEnd = utilGetPhaseEndTs(phase, project);

            // Check if the phase is active during the month
            if (phaseEnd >= mnthStart && phaseStart <= mnthEnd) {
                // Calculate overlap period
                const overlapStart = Math.max(phaseStart, mnthStart);
                const overlapEnd = Math.min(phaseEnd, mnthEnd);

                const days = utilCalculateWorkdaysBetweenTimes(overlapStart, overlapEnd, true, project.holidays || []);

                const dayOfPhase = utilCalculatePhaseSingleDay(phase, project);

                const costForPeriod = dayOfPhase.price * days;
                const hoursForPeriod = dayOfPhase.hours * days;

                budgetItem.cost += costForPeriod;
                budgetItem.hours += hoursForPeriod;

                budgetItem.partsCost![phase.name] = costForPeriod;
                budgetItem.partsHours![phase.name] = hoursForPeriod;
            }
        });

        cumulativeCost += budgetItem.cost;
        budgetItem.cumulativeCost = cumulativeCost;

        cumulativeHours += budgetItem.hours;
        budgetItem.cumulativeHours = cumulativeHours;

        budgetSummary.push(budgetItem);

        curMonth = curMonth.plus({ months: 1 }).startOf("month").startOf("day");
    }

    return budgetSummary;
}
