import { ITechnology } from "@frosttroll/projecttoolmodels/dist/src/index.js";
import { Injectable, Logger } from "@nestjs/common";
import { DEFAULT_TECHNOLOGIES } from "./default_technologies";
import { InjectRepository } from "@nestjs/typeorm";
import { TechnologyEntity } from "./technology.entity";
import { Repository } from "typeorm";
import { v4 } from "uuid";
import { TechnologyDTO } from "./technology.dto";

@Injectable()
export class TechnologyService {
    private techCache: Map<string, ITechnology> = new Map<string, ITechnology>();

    private technologyRepository: Repository<TechnologyEntity>;

    private cacheValid: boolean = false;

    private readonly logger = new Logger(TechnologyService.name);

    /**
     * Constructor
     *
     * Initializes the technology service with default technologies.
     */
    constructor(@InjectRepository(TechnologyEntity) technologyRepository: Repository<TechnologyEntity>) {
        this.technologyRepository = technologyRepository;
        void this.syncDatabaseWithDefaults().then(() => {
            this.cacheValid = false;
        });
    }

    /**
     * Retrieves all technologies.
     * @returns An array of all technologies.
     */
    async getAll(): Promise<ITechnology[]> {
        if (this.cacheValid) {
            return Promise.resolve(Array.from(this.techCache.values()));
        }

        const res = await this.technologyRepository.find();

        if (res) {
            const resParsed = res.map((t: TechnologyEntity) => t as ITechnology);
            this.techCache = new Map<string, ITechnology>(resParsed.map((t) => [t.guid, t]));
            this.cacheValid = true;
            return Promise.resolve(resParsed);
        }
        return Promise.resolve([]);
    }

    /**
     * Creates a new technology entry.
     * @param tech The technology to be added.
     */
    async create(tech: Partial<ITechnology | TechnologyDTO>): Promise<void> {
        this.cacheValid = false;
        const newGuid = v4();

        if (!tech.name) {
            throw new Error("Technology name is required.");
        }

        this.logger.log(`Creating new technology: ${tech.name} and assigning GUID: ${newGuid}`);
        const techEntity = this.technologyRepository.create({
            guid: newGuid,
            name: tech.name || "",
            description: tech.description || "",
            category: tech.category || [],
            appLayer: tech.appLayer || [],
        } as TechnologyEntity);
        await this.technologyRepository.save(techEntity);
    }

    /**
     * Retrieves a technology by its GUID.
     * @param guid The GUID of the technology.
     * @returns The technology if found, otherwise null.
     */
    async getByGuid(guid: string): Promise<ITechnology | null> {
        const results = await this.technologyRepository.findOne({
            where: {
                guid: guid,
            },
        });

        if (results) {
            return results as ITechnology;
        }
        return Promise.resolve(null);
    }

    async update(tech: ITechnology | TechnologyDTO): Promise<void> {
        this.cacheValid = false;
        await this.technologyRepository.save(tech as TechnologyEntity);
    }

    private async syncDatabaseWithDefaults(): Promise<void> {
        if (process.env.DB_CLEARDB_ON_STARTUP === "true") {
            await this.technologyRepository.clear();
            // Reset auto-incrementing ID sequence
            await this.technologyRepository.query("ALTER SEQUENCE technology_entity_id_seq RESTART WITH 1;");
        }

        const defaultTechs: ITechnology[] = [...(DEFAULT_TECHNOLOGIES as ITechnology[])];
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
