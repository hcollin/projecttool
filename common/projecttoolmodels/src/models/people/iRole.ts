import { IRootObject } from "../IRootObject";
import { ITextObject } from "../text/iText";

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
    template?: IRoleTemplate;
}

/**
 * Template for roles. This can be used to define standard roles that can be assigned to people.
 */
export interface IRoleTemplate extends ITextObject {
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
