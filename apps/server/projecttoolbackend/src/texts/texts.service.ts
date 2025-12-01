import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TextEntity } from "./text.entity";
import { TextDto } from "./text.dto";
import { DEFAULT_TEXTS } from "./defaulttexts";
import { IText } from "@frosttroll/projecttoolmodels";

@Injectable()
export class TextsService {
    private textRepository: Repository<TextEntity>;

    private readonly logger = new Logger(TextsService.name);

    constructor(@InjectRepository(TextEntity) repo: Repository<TextEntity>) {
        this.textRepository = repo;
        void this.syncDatabaseWithDefaults().then(() => {
            this.logger.log("Text database synchronized with default texts.");
        });
    }

    /**
     * Load a list of texts with meta information. No actual content is loaded
     * @returns
     */
    async getTextList(): Promise<TextDto[]> {
        const res = await this.textRepository.find({
            select: {
                guid: true,
                organizationGuid: true,
                name: true,
                language: true,
                keywords: true,
                langlinks: true,
                metadata: true,
            },
        });

        if (!res) {
            throw new Error("Could not retrieve texts");
        }

        return res.map((text) => {
            const dto = new TextDto();
            dto.guid = text.guid;
            dto.organizationId = text.organizationGuid;
            dto.name = text.name;
            dto.keywords = text.keywords;
            dto.language = text.language;
            dto.langlinks = text.langlinks;
            dto.metadata = text.metadata;
            dto.content = ""; // Content not loaded in list view
            return dto;
        });
    }

    /**
     * Search texts by keywords
     * @param keywords
     * @returns
     */
    async getTextsByKeywords(keywords: string[], lang?: string): Promise<TextDto[]> {
        this.logger.debug(`Searching texts with keywords: ${keywords.join(", ")}`);
        const results = await this.textRepository
            .createQueryBuilder("text")
            .where(
                keywords.map((_, i) => `text.keywords LIKE :kw${i}`).join(" OR "),
                Object.fromEntries(keywords.map((kw, i) => [`kw${i}`, `%${kw}%`])),
            )
            .andWhere(lang ? "text.language = :lang" : "1=1", { lang })
            .getMany();

        if (!results) {
            throw new Error("Could not retrieve texts by keywords");
        }

        return results.map((text) => {
            return text.getDto();
        });
    }

    /**
     * Get a text by its GUID
     * @param guid
     * @returns
     */
    async getTextByGuid(guid: string): Promise<TextDto | null> {
        this.logger.debug(`Retrieving text with GUID: ${guid}`);
        const result = await this.textRepository.findOne({
            where: { guid },
        });
        if (!result) {
            return null;
        }
        return result.getDto();
    }

    /**
     * Create a new text entry
     * @param textData
     * @returns
     */
    async createText(textData: Partial<TextDto>): Promise<TextDto> {
        this.logger.debug(`Creating new text with name: ${textData.name}`);
        const newText = new TextEntity();
        newText.updateFromDto(textData as TextDto);
        const savedText = await this.textRepository.save(newText);
        return savedText.getDto();
    }

    async updateText(guid: string, textData: TextDto): Promise<TextDto> {
        this.logger.debug(`Updating text with GUID: ${guid}`);
        const existingText = await this.textRepository.findOne({ where: { guid } });
        if (!existingText) {
            throw new Error(`Text with GUID ${guid} not found.`);
        }
        existingText.updateFromDto(textData);
        const updatedText = await this.textRepository.save(existingText);
        return updatedText.getDto();
    }

    //======================================================================
    // Private Methods
    //======================================================================

    /**
     * Initialize or synchronize the database with default texts. Also clears the database if the environment variable is set.
     * @returns
     */
    private async syncDatabaseWithDefaults(): Promise<void> {
        if (process.env.DB_CLEARDB_ON_STARTUP === "true") {
            await this.textRepository.clear();
            try {
                await this.textRepository.query("ALTER SEQUENCE text_entity_id_seq RESTART WITH 1;");
            } catch (error) {
                this.logger.warn("Failed to reset text_entity_id_seq sequence:", error);
            }
        }

        const defaultTexts: IText[] = DEFAULT_TEXTS;
        const existingTexts = await this.textRepository.find();

        const existingGuids = new Set<string>(existingTexts.map((t) => t.guid));

        for (const text of defaultTexts) {
            if (text && typeof text.guid === "string" && !existingGuids.has(text.guid)) {
                const txtEnt = new TextEntity();
                txtEnt.updateFromDto(text as TextDto);
                txtEnt.guid = text.guid;
                const textEntity = this.textRepository.create(txtEnt);
                await this.textRepository.save(textEntity);
            }
        }

        return Promise.resolve();
    }
}
