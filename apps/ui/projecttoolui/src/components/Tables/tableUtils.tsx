import {
    CURRENCY,
    IProject,
    ROLESENIORITY,
    utilCalculatePhaseDuration,
    utilCalculatePhasePrice,
    utilCalculatePhaseSingleDay,
    utilCalculatePhaseAllocatedWorkHours,
    utilCurrencyToSymbol,
    utilGetPhaseEndTs,
    utilGetPhaseStartTs,
} from "@frosttroll/projecttoolmodels";
import { TableData } from "@mantine/core";
import { formatCurrency, formatHours } from "../../utils/formatingUtils";
import { DateTime } from "luxon";

/**
 * Calculate projects costs and hours per role and phase
 * @param project
 * @param type
 * @param showRateColumn
 * @returns
 */
export function calculateProjectCosts(
    project: IProject,
    type: "hours" | "cost" | "both",
    showRateColumn?: boolean
): TableData {
    const headers: string[] = [];

    const phaseTotalHours: number[] = [];
    const phaseTotalCosts: number[] = [];
    let currency: CURRENCY = CURRENCY.EUR;

    const phases = [...project.phases].sort((a, b) => {
        const aStartTs = utilGetPhaseStartTs(a, project);
        const bStartTs = utilGetPhaseStartTs(b, project);

        if (aStartTs === bStartTs) {
            const aEndTs = utilGetPhaseEndTs(a, project);
            const bEndTs = utilGetPhaseEndTs(b, project);
            return bEndTs - aEndTs;
        }

        return aStartTs - bStartTs;
    });

    headers.push("Role");
    if (showRateColumn) {
        headers.push("Hourly Rate");
    }
    phases.forEach((phase, i) => {
        if (type !== "hours") {
            headers.push(phase.name + (type === "both" ? " Cost" : ""));
        }
        if (type !== "cost") {
            headers.push(phase.name + (type === "both" ? " Hours" : ""));
        }
    });
    if (type !== "hours") {
        headers.push("Total Cost");
    }
    if (type !== "cost") {
        headers.push("Total Hours");
    }

    const data = project.roles.reduce(
        (rows, role) => {
            const row: (string | number | boolean)[] = [];

            // First column is the role name
            // headers.add("Role");
            row.push(`${role.seniority !== ROLESENIORITY.MIDLEVEL ? role.seniority + ` ` : ``}${role.name}`);

            // Second column is the price groups hourly rate if requested

            const priceGroup = project.prices.hourlypricegroups.find((hrpg) => hrpg.guid === role.priceGroupId);
            let hourlyrate = 0;
            hourlyrate = priceGroup ? priceGroup.price : 0;
            currency = project.currency;

            if (showRateColumn) {
                // headers.add("Hourly Rate");
                if (priceGroup) {
                    row.push(`${priceGroup.price} ${utilCurrencyToSymbol(project.currency)}`);
                } else {
                    row.push("N/A");
                }
            }

            // Next columns are per phase
            let roleTotalHours = 0;
            let roleTotalCost = 0;
            phases.forEach((phase, pi) => {
                const alloc = phase.allocations.find((a) => a.roleGuid === role.guid);
                if (alloc && alloc.allocation > 0) {
                    const days = utilCalculatePhaseDuration(phase, project, true);
                    const hours = days * (7.5 * (alloc.allocation / 100));
                    const cost = hours * hourlyrate;
                    roleTotalHours += hours;
                    roleTotalCost += cost;
                    phaseTotalHours[pi] = (phaseTotalHours[pi] || 0) + hours;
                    phaseTotalCosts[pi] = (phaseTotalCosts[pi] || 0) + cost;
                    if (type !== "hours") {
                        // headers.add(phase.name + (type === "both" ? " Cost" : ""));
                        row.push(formatCurrency(cost, project.currency || CURRENCY.EUR));
                    }
                    if (type !== "cost") {
                        // headers.add(phase.name + (type === "both" ? " Hours" : " h"));
                        row.push(formatHours(hours));
                    }
                } else {
                    row.push("-");
                    if (type === "both") {
                        row.push("-");
                    }
                }
            });

            // Final columns are totals

            if (type !== "hours") {
                // headers.add("Total Cost");
                row.push(formatCurrency(roleTotalCost, currency));
            }
            if (type !== "cost") {
                // headers.add("Total Hours");
                row.push(formatHours(roleTotalHours));
            }
            rows.push(row);

            return rows;
        },
        [] as (string | number | boolean)[][]
    );

    // Calculate phase totals row

    if (type !== "hours") {
        const totalPhaseCostRow: (string | number | boolean)[] = [];
        totalPhaseCostRow.push("Total Cost");
        if (showRateColumn) totalPhaseCostRow.push(" ");
        phaseTotalCosts.forEach((cost) => {
            totalPhaseCostRow.push(formatCurrency(cost, currency));
            if (type === "both") {
                totalPhaseCostRow.push(" ");
            }
        });
        // totalPhaseCostRow.push(...phaseTotalCosts.map((cost) => formatCurrency(cost, currency)));
        data.push(totalPhaseCostRow);

        const total = phaseTotalCosts.reduce((sum, val) => sum + val, 0);
        totalPhaseCostRow.push(formatCurrency(total, currency));
    }

    if (type !== "cost") {
        const totalPhaseHoursRow: (string | number | boolean)[] = [];
        totalPhaseHoursRow.push("Total Hours");
        if (showRateColumn) totalPhaseHoursRow.push(" ");
        phaseTotalHours.forEach((hours) => {
            if (type === "both") {
                totalPhaseHoursRow.push(" ");
            }
            totalPhaseHoursRow.push(formatHours(hours));
        });
        // totalPhaseHoursRow.push(...phaseTotalHours.map((hours) => hours.toFixed(2)));
        data.push(totalPhaseHoursRow);
        const total = phaseTotalHours.reduce((sum, val) => sum + val, 0);
        if (type === "both") {
            totalPhaseHoursRow.push(" ");
        }
        totalPhaseHoursRow.push(formatHours(total));
    }

    // totalRow.push("Total");
    // totalRow.push(""); // Empty cell for hourly rate

    return {
        head: Array.from(headers),
        body: data,
    };
}

export function calculateTablePhaseSummary(project: IProject): TableData {
    const headers: string[] = [];
    headers.push("Phase");

    headers.push("Duration (in workdays)");
    headers.push("Start Date");
    headers.push("End Date");

    headers.push("Total hours");

    headers.push("Day Price");
    headers.push("Total cost");

    const rows: (string | number | boolean)[][] = [];

    const phases = [...project.phases].sort((a, b) => {
        const aStartTs = utilGetPhaseStartTs(a, project);
        const bStartTs = utilGetPhaseStartTs(b, project);

        if (aStartTs === bStartTs) {
            const aEndTs = utilGetPhaseEndTs(a, project);
            const bEndTs = utilGetPhaseEndTs(b, project);
            return aEndTs - bEndTs;
        }

        return aStartTs - bStartTs;
    });

    phases.forEach((phase) => {
        const row: (string | number | boolean)[] = [];

        const workdays = utilCalculatePhaseDuration(phase, project, true);

        const dayPrice = utilCalculatePhaseSingleDay(phase, project);

        const phasePrice = utilCalculatePhasePrice(phase, project);

        const phaseStart = DateTime.fromMillis(utilGetPhaseStartTs(phase, project))
            .setLocale("fi")
            .toLocaleString(DateTime.DATE_SHORT);

        const phaseEnd = DateTime.fromMillis(utilGetPhaseEndTs(phase, project))
            .setLocale("fi")
            .toLocaleString(DateTime.DATE_SHORT);

        const totalHours = utilCalculatePhaseAllocatedWorkHours(phase, project);

        row.push(phase.name);
        row.push(workdays);

        row.push(phaseStart);
        row.push(phaseEnd);
        row.push(formatHours(totalHours));
        row.push(`${dayPrice.price} ${utilCurrencyToSymbol(project.currency)}`);
        row.push(formatCurrency(phasePrice, project.currency || CURRENCY.EUR));

        rows.push(row);
    });

    return {
        head: headers,
        body: rows,
    };
}
