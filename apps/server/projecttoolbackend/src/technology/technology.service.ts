import { ITechnology } from "@frosttroll/projecttoolmodels/dist/src/index.js";
import { Injectable } from "@nestjs/common";
import { DEFAULT_TECHNOLOGIES } from "./default_technologies";
import { InjectRepository } from "@nestjs/typeorm";
import { TechnologyEntity } from "./technology.entity";
import { Repository } from "typeorm";

@Injectable()
export class TechnologyService {
    private techs: Map<string, ITechnology> = new Map<string, ITechnology>();

    private technologyRepository: Repository<TechnologyEntity>;

    /**
     * Constructor
     *
     * Initializes the technology service with default technologies.
     */
    constructor(@InjectRepository(TechnologyEntity) technologyRepository: Repository<TechnologyEntity>) {
        this.technologyRepository = technologyRepository;
        this.syncDatabaseWithDefaults();
    }

    /**
     * Retrieves all technologies.
     * @returns An array of all technologies.
     */
    getAll(): ITechnology[] {
        return Array.from(this.techs.values());
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
    async getByGuid(guid: string): Promise<ITechnology | null> {
        const results = await this.technologyRepository.findOneBy({ guid });

        if (results) {
            return results as ITechnology;
        }
        return Promise.resolve(null);
    }

    update(tech: ITechnology): void {
        if (this.techs.has(tech.guid)) {
            this.techs.set(tech.guid, tech);
        } else {
            throw new Error(`Technology with GUID ${tech.guid} does not exist.`);
        }
    }

    private async syncDatabaseWithDefaults(): Promise<void> {
        if (process.env.DB_CLEARDB_ON_STARTUP === "true") {
            await this.technologyRepository.clear();
        }

        const defaultTechs: ITechnology[] = DEFAULT_TECHNOLOGIES;
        const existingTechs = await this.technologyRepository.find();
        const existingGuids = new Set(existingTechs.map((t) => t.guid));

        for (const tech of defaultTechs) {
            if (!existingGuids.has(tech.guid)) {
                const techEntity = this.technologyRepository.create(tech as TechnologyEntity);
                await this.technologyRepository.save(techEntity);
            }
        }
    }
}
