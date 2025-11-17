import { IProject, utilCalculatePhaseDuration, utilCalculatePhasePrice } from "@frosttroll/projecttoolmodels";
import { uRoleName } from "./formatingUtils";

interface IProjectRoleSummary {
    role: string;
    hourlyRate: number;
    currency: string;
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
            currency: "",
            phases: {},
            totalHours: 0,
            totalCost: 0,
        };

        const priceGroup = project.prices.hourlypricegroups.find((hrpg) => hrpg.guid === role.priceGroupId);

        if (priceGroup) {
            summary.hourlyRate = priceGroup.price;
            summary.currency = priceGroup.currency;
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

interface IProjectBudgetSummary {
    key: string;
    order: number;

    cost: number;
    cumulativeCost: number;

    hours: number;
    cumulativeHours: number;
}

export function uCalculateProjectBudgetSummary(
    project: IProject,
    group: "phase" | "month" | "week"
): IProjectBudgetSummary[] {
    const budgetSummary: IProjectBudgetSummary[] = [];

    let cumulativeCost = 0;
    let cumulativeHours = 0;

    if (group === "phase") {
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
    return budgetSummary;
}
