import { IRole, ROLESENIORITY } from "@frosttroll/projecttoolmodels";

export function uRoleName(role: IRole): string {
    return `${role.seniority !== ROLESENIORITY.MIDLEVEL ? role.seniority + ` ` : ``}${role.name}`;
}


export function formatCurrency(value: number, currency: string): string {
    return `${value.toLocaleString(`fi-FI`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`;
}

export function formatHours(value: number): string {
    return `${value.toFixed(2)} h`;
}