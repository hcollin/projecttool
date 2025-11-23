import { IRole, IRoleTemplate, ROLESENIORITY } from "@frosttroll/projecttoolmodels";
/**
 * Convert a role template to a role instance. This requires an organization ID to assign the role to.
 * @param roletemplate
 * @param orgId
 * @returns
 */
export declare function convertRoleTemplateToRole(roletemplate: IRoleTemplate, orgId: string, seniority?: ROLESENIORITY): IRole;
//# sourceMappingURL=roleutils.d.ts.map