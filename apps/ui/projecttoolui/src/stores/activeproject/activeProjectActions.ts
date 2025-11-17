import {
    CURRENCY,
    IHourlyPriceGroup,
    IProject,
    IRole,
    IPhase,
    ROLESENIORITY,
    IPhaseAllocation,
} from "@frosttroll/projecttoolmodels";

import activeProjectStore from "./activeProjectStore";
import dataRolesStore from "../data/roles/dataRolesStore";

/**
 * Create a new unsaved project and set it as the active project.
 * @returns The newly created unsaved project.
 */
export function actionSetActiveProject(p: IProject): IProject {
    activeProjectStore.project = p;
    activeProjectStore.unsavedChanges = true;

    return p;
}

/**
 * Simulate saving the active project by resetting the unsavedChanges flag.
 */
export function actionSaveActiveProject(): void {
    if (activeProjectStore.project) {
        activeProjectStore.unsavedChanges = false;
    }
}

/**
 * Update the active project in the store with the provided project object.
 * @param project
 */
export function actionUpdateActiveProject(project: IProject): void {
    if (!activeProjectStore.project) {
        console.warn("No active project to update.");
        return;
    }
    if (project.guid !== activeProjectStore.project.guid) {
        console.warn("Trying to update active project with a different project GUID.");
        return;
    }
    // console.log("CURRENT PROJECT BEFORE UPDATE:", { ...activeProjectStore.project });
    // console.log("UPDATING ACTIVE PROJECT TO:", { ...project });
    activeProjectStore.project = { ...project };
    activeProjectStore.unsavedChanges = true;
    // console.log("AFTER UPDATE ACTIVE PROJECT TO:", { ...activeProjectStore.project });
}

/**
 * Add new role to the active project
 * @param role
 */
export function actionAddNewRoleToActiveProject(role: IRole): void {
    if (activeProjectStore.project) {
        if (!activeProjectStore.project.roles) {
            activeProjectStore.project.roles = [];
        }

        // Set the default price group if available
        if (activeProjectStore.project.prices.hourlypricegroups.length > 0 && !role.priceGroupId) {
            role.priceGroupId = activeProjectStore.project.prices.hourlypricegroups[0].guid;
        }

        // Set seniority to Midlevel if it is possible
        if (role.seniority === undefined) {
            const roleTemplate = dataRolesStore.roles.find((r) => r.id === role.templateId);
            if (roleTemplate && roleTemplate.seniorities.includes(ROLESENIORITY.MIDLEVEL)) {
                role.seniority = ROLESENIORITY.MIDLEVEL;
            }
        }

        activeProjectStore.project.roles.push(role);

        activeProjectStore.unsavedChanges = true;
    } else {
        console.warn("No active project to add role to.");
    }
}

/**
 * Remove a role from the active project
 * @param roleGuid
 */
export function actionRemoveRoleFromActiveProject(roleGuid: string): void {
    if (activeProjectStore.project) {
        if (activeProjectStore.project.roles) {
            activeProjectStore.project.roles = activeProjectStore.project.roles.filter((r) => r.guid !== roleGuid);
            activeProjectStore.unsavedChanges = true;
        }
    }
}

/**
 * Update a role in the active project
 * @param updatedRole
 */
export function actionUpdateRoleInActiveProject(updatedRole: IRole): void {
    if (activeProjectStore.project) {
        if (activeProjectStore.project.roles) {
            const index = activeProjectStore.project.roles.findIndex((r) => r.guid === updatedRole.guid);
            if (index !== -1) {
                activeProjectStore.project.roles[index] = updatedRole;
                activeProjectStore.unsavedChanges = true;
            }
        }
    }
}

/**
 * Update the price of the target pricegroup in the active project
 * @param prgId
 * @param newPrice
 */
export function actionUpdatePriceGroupInActiveProject(updatedPriceGroup: IHourlyPriceGroup): void {
    if (activeProjectStore.project) {
        const prgs = activeProjectStore.project.prices.hourlypricegroups;

        let changed = false;
        const nprgs = prgs.map((p) => {
            if (p.guid === updatedPriceGroup.guid) {
                changed = true;
                return { ...updatedPriceGroup };
            }
            return p;
        });
        if (changed) {
            activeProjectStore.project.prices.hourlypricegroups = nprgs;
            activeProjectStore.unsavedChanges = true;
        }
    }
}

/**
 * Add a new empty price group to the active project based on the default price group.
 */
export function actionAddNewEmptyPriceGroupToActiveProject(): void {
    if (activeProjectStore.project) {
        const defaultPriceGroup = activeProjectStore.project.prices.hourlypricegroups[0];
        if (!defaultPriceGroup) {
            console.warn("No existing default price group to base the new price group on.");
        }
        const targetCurrency = defaultPriceGroup ? defaultPriceGroup.currency : CURRENCY.EUR;
        const targetPrice = defaultPriceGroup ? defaultPriceGroup.price : 100;
        const newPrg: IHourlyPriceGroup = {
            guid: `pricegroup-${Date.now()}`,
            organizationId: activeProjectStore.project.organizationId,
            name: `New Price Group`,
            price: targetPrice,
            currency: targetCurrency,
            permanent: false,
        };
        if (!activeProjectStore.project.prices.hourlypricegroups) {
            activeProjectStore.project.prices.hourlypricegroups = [];
        }
        activeProjectStore.project.prices.hourlypricegroups.push(newPrg);
        activeProjectStore.unsavedChanges = true;
    }
}

/**
 * Remove a price group from the active project
 * @param prgGuid
 */
export function actionRemovePriceGroupFromActiveProject(prgGuid: string): void {
    if (activeProjectStore.project) {
        const prgs = activeProjectStore.project.prices.hourlypricegroups;
        const nprgs = prgs.filter((p) => p.guid !== prgGuid);
        if (nprgs.length !== prgs.length) {
            activeProjectStore.project.prices.hourlypricegroups = nprgs;
            activeProjectStore.unsavedChanges = true;
        }
    }
}

/**
 * Update an existing project phase in the active project
 * @param updatedPhase
 */
export function actionUpdateProjectPhaseInActiveProject(updatedPhase: IPhase): void {
    if (activeProjectStore.project) {
        const phases = [...activeProjectStore.project.phases];
        const nphases = phases.map((phase) => {
            if (phase.guid === updatedPhase.guid) {
                return { ...updatedPhase };
            }
            return { ...phase };
        });
        activeProjectStore.project.phases = [...nphases];
        activeProjectStore.unsavedChanges = true;
    }
}

/**
 * Add new empty phase to the active project
 * @returns
 */
export function actionAddNewPhaseToActiveProject(): void {
    if (!activeProjectStore.project) {
        return;
    }

    // const projectStart = activeProjectStore.project.start;

    const newPhase: IPhase = {
        guid: `phase-${Date.now()}`,
        organizationId: activeProjectStore.project!.organizationId,
        name: `New Phase`,
        start: { atProjectStart: true },
        end: {
            atProjectEnd: true,
        },
        allocations: [],
    };

    if (activeProjectStore.project) {
        activeProjectStore.project.phases.push(newPhase);
        activeProjectStore.unsavedChanges = true;
    }
}

/**
 * Remove a phase from the active project.
 * @param phaseGuid
 */
export function actionRemovePhaseFromActiveProject(phaseGuid: string): void {
    if (activeProjectStore.project) {
        const phases = activeProjectStore.project.phases;
        const nphases = phases.filter((p) => p.guid !== phaseGuid);
        if (nphases.length !== phases.length) {
            activeProjectStore.project.phases = nphases;
            activeProjectStore.unsavedChanges = true;
        }
    }
}

export function actionAddRoleAllocationToPhaseInActiveProject(
    phaseGuid: string,
    roleGuid: string,
    allocation: number
): void {
    if (activeProjectStore.project) {
        const phases = [...activeProjectStore.project.phases];

        const nphases = phases.map((phase) => {
            if (phase.guid === phaseGuid) {
                const newAllocs: IPhaseAllocation[] = phase.allocations
                    ? [...phase.allocations.map((a) => ({ ...a }))]
                    : ([] as IPhaseAllocation[]);

                const existingAlloc = newAllocs.findIndex((a) => a.roleGuid === roleGuid);

                if (existingAlloc !== -1 && newAllocs[existingAlloc]) {
                    newAllocs[existingAlloc].allocation = allocation;
                } else {
                    newAllocs.push({ roleGuid, allocation });
                }
                return { ...phase, allocations: newAllocs };
            }
            return { ...phase };
        });
        activeProjectStore.project.phases = [...nphases];
        activeProjectStore.unsavedChanges = true;
    }
}
