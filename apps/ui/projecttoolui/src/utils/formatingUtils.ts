import { CURRENCY, IRole, ROLESENIORITY, utilCurrencyToSymbol } from "@frosttroll/projecttoolmodels";
import { DateTime } from "luxon";


export function uRoleName(role: IRole): string {
    return `${role.seniority !== ROLESENIORITY.MIDLEVEL ? role.seniority + ` ` : ``}${role.name}`;
}

export function formatCurrency(value: number, currency: CURRENCY): string {
    return `${value.toLocaleString(`fi-FI`, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${utilCurrencyToSymbol(currency)}`;
}

export function formatHours(value: number): string {
    return `${value.toFixed(2)} h`;
}

export function formatTs(timestamp: number): string {
    const d = DateTime.fromMillis(timestamp);
    return d.toLocaleString(DateTime.DATETIME_MED);
}
