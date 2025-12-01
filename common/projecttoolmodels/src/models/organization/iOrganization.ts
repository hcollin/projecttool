

/**
 * Organization model interface
 */
export interface IOrganization {
    // Globally unique identifier for the organization
    guid: string;

    // Name of the organization
    name: string;

    // Description of the organization
    description?: string;
}