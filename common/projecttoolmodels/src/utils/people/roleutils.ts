import { IRole, IRoleTemplate, ROLESENIORITY } from "@frosttroll/projecttoolmodels";
import { rnd } from "rndlib";

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
        guid: `role-${roletemplate.id}-${rnd(10000, 99999)}`,
        organizationId: orgId,
        name: roletemplate.name,
        templateId: roletemplate.id,

        description: roletemplate.description,
    };
    if (seniority) {
        role.seniority = seniority;
    }
    return role;
}
