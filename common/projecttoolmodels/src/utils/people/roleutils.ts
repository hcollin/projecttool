import { DateTime } from "luxon";
import { rnd } from "rndlib";
import { IRole, IRoleTemplate, ROLESENIORITY } from "../../models/people/iRole";
import { IProject } from "../../models/project/iProject";
import { utilGetPhaseStartTs, utilGetPhaseEndTs } from "../project/phaseUtils";

/**
 * Convert a role template to a role instance. This requires an organization ID to assign the role to.
 * @param roletemplate
 * @param orgId
 * @returns
 */
export function convertRoleTemplateToRole(
    roletemplate: IRoleTemplate,
    orgId: string,
    seniority?: ROLESENIORITY
): IRole {
    const role: IRole = {
        guid: `role-${roletemplate.guid}-${rnd(10000, 99999)}`,
        organizationId: orgId,
        name: roletemplate.name,
        templateId: roletemplate.guid,

        description: roletemplate.description,
        template: roletemplate,
    };
    if (seniority) {
        role.seniority = seniority;
    }
    return role;
}

/**
 * Calculate the utilization of a role per day in percentage based on allocations in project phases.
 * @param roleGuid
 * @param project
 * @returns
 */
export function utilRoleDayUtilizationPercentagePerDay(roleGuid: string, project: IProject): Map<string, number> {
    const utilization: Map<string, number> = new Map<string, number>();

    project.phases.forEach((phase) => {
        const alloc = phase.allocations.find((a) => a.roleGuid === roleGuid);
        if (!alloc) {
            return;
        }

        const phStart = utilGetPhaseStartTs(phase, project);
        const phEnd = utilGetPhaseEndTs(phase, project);

        let sd = DateTime.fromMillis(phStart).startOf("day");
        const ed = DateTime.fromMillis(phEnd).startOf("day");

        while (sd <= ed) {
            const sdKey = sd.toISODate();
            if (!sdKey) {
                console.warn("Could not get ISO date for", sd);
                sd = sd.plus({ days: 1 });
                continue;
            }

            const currentUtil = utilization.get(sdKey) || 0;
            utilization.set(sdKey, currentUtil + alloc.allocation);
            sd = sd.plus({ days: 1 });
        }
    });

    return utilization;
}

function sortRoleByName(a: IRole, b: IRole): number {
    return a.name.localeCompare(b.name);
}

function sortRoleByPrice(a: IRole, b: IRole, project: IProject): number {
    const aPg = project.prices.hourlypricegroups.find((pg) => pg.guid === a.priceGroupId);
    const bPg = project.prices.hourlypricegroups.find((pg) => pg.guid === b.priceGroupId);
    const aPrice = aPg ? aPg.price : 0;
    const bPrice = bPg ? bPg.price : 0;

    if (aPrice === bPrice) {
        return sortBySeniority(a, b);
    }

    return bPrice - aPrice;
}

function sortBySeniority(a: IRole, b: IRole): number {
    const seniorityOrder: ROLESENIORITY[] = [
        ROLESENIORITY.INTERN,
        ROLESENIORITY.JUNIOR,
        ROLESENIORITY.MIDLEVEL,
        ROLESENIORITY.SENIOR,
        ROLESENIORITY.LEAD,
        ROLESENIORITY.PRINCIPAL,
    ];

    const aIndex = a.seniority ? seniorityOrder.indexOf(a.seniority) * 10 : -10;
    const bIndex = b.seniority ? seniorityOrder.indexOf(b.seniority) * 10 : -10;

    const aPoints = calcRolePoints(a) + aIndex;
    const bPoints = calcRolePoints(b) + bIndex;

    return bPoints - aPoints;
}

function calcRolePoints(role: IRole): number {
    let points = 0;
    if (role.template) {
        points += role.template.groups.includes("Management") ? 5 : 0;
        points += role.template.groups.includes("Architecture") ? 3 : 0;
        points += role.template.groups.includes("Design") ? 2 : 0;
        points += role.template.groups.includes("Data") ? 2 : 0;
    }

    return points;
}

export const utilRoleSort = {
    sortRoleByName,
    sortRoleByPrice,
    sortBySeniority,
    calcRolePoints,
};
