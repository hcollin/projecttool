import { IRootObject } from "../IRootObject";

/**
 * Represents a role in the project that one or more people can have.
 */
export interface IRole extends IRootObject {
    name: string;
    personId?: string;
    templateId?: string;
    seniority?: ROLESENIORITY;
    priceGroupId?: string;
    description?: string;
}

/**
 * Template for roles. This can be used to define standard roles that can be assigned to people.
 */
export interface IRoleTemplate {
    guid: string;
    name: string;
    groups: string[];
    seniorities: ROLESENIORITY[];
    description?: string;
}

/**
 * Role seniority levels
 */
export enum ROLESENIORITY {
    INTERN = "Intern",
    JUNIOR = "Junior",
    MIDLEVEL = "Mid-level",
    SENIOR = "Senior",
    LEAD = "Lead",
    PRINCIPAL = "Principal",
}
