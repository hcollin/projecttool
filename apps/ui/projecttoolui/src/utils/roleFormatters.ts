import { IRole, ROLESENIORITY } from "@frosttroll/projecttoolmodels";

export function uRoleName(role: IRole): string {
    return `${role.seniority !== ROLESENIORITY.MIDLEVEL ? role.seniority + ` ` : ``}${role.name}`;
}
