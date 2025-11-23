import { ITechnology } from "@frosttroll/projecttoolmodels/dist/src/index.js";
import { Injectable } from "@nestjs/common";
import { DEFAULT_TECHNOLOGIES } from "./default_technologies";

@Injectable()
export class TechnologyService {
    private techs: Map<string, ITechnology> = new Map<string, ITechnology>();

    /**
     * Constructor
     *
     * Initializes the technology service with default technologies.
     */
    constructor() {
        this.techs = new Map<string, ITechnology>();
        const defaultTechs: ITechnology[] = DEFAULT_TECHNOLOGIES;
        defaultTechs.forEach((tech) => {
            this.techs.set(tech.guid, tech);
        });
    }

    /**
     * Creates a new technology entry.
     * @param tech The technology to be added.
     */
    create(tech: Partial<ITechnology>): void {
        const newTech: ITechnology = {
            guid: `tech-${Date.now()}`, // Simple GUID generation
            name: "Unnamed Hype Tech",
            description: "",
            category: [],
            appLayer: [],
            ...tech,
        };

        this.techs.set(newTech.guid, newTech);
    }

    /**
     * Retrieves a technology by its GUID.
     * @param guid The GUID of the technology.
     * @returns The technology if found, otherwise null.
     */
    getByGuid(guid: string): ITechnology | null {
        return this.techs.get(guid) || null;
    }

    update(tech: ITechnology): void {
        if (this.techs.has(tech.guid)) {
            this.techs.set(tech.guid, tech);
        } else {
            throw new Error(`Technology with GUID ${tech.guid} does not exist.`);
        }
    }

    /**
     * Retrieves all technologies.
     * @returns An array of all technologies.
     */
    getAll(): ITechnology[] {
        return Array.from(this.techs.values());
    }
}
