

export interface IRootObject {
    // Gloably unique identifier for this object instance
    guid: string;

    // To what organization does this object belong
    organizationId: string;

    // Texts that have been selected for this object
    textGuids?: string[];
}