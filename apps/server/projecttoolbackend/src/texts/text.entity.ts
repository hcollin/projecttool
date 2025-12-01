import { RootEntity } from "src/database/rootentity.entity";
import { Column, Entity } from "typeorm";
import { TextDto } from "./text.dto";
import { v4 } from "uuid";

@Entity()
export class TextEntity extends RootEntity<TextEntity> {
    @Column({ type: "text", default: "" })
    content!: string;

    @Column({ type: "simple-array", default: "" })
    keywords!: string[];

    @Column({ type: "text", default: "" })
    name!: string;

    @Column({ type: "text", default: "en" })
    language!: string;

    @Column({ type: "simple-json", nullable: true })
    langlinks?: Record<string, string>;

    @Column({ type: "simple-json", nullable: true })
    metadata?: {
        createdAt: number;
        createdBy: string;
        updatedAt?: number;
        updatedBy?: string;
        contentLength: number;
    };

    constructor(data?: Partial<TextEntity>) {
        super(data);
        if (!this.guid) {
            this.guid = v4();
        }
        if (!this.organizationGuid) {
            this.organizationGuid = "default-org";
        }

        if (!this.keywords) {
            this.keywords = [];
        }
    }

    updateFromDto(dto: Partial<TextDto>): void {
        if (dto.guid !== undefined) {
            this.guid = dto.guid;
        }
        if (dto.organizationId !== undefined) {
            this.organizationGuid = dto.organizationId;
        }
        if (dto.language !== undefined) {
            this.language = dto.language;
        }
        if (dto.langlinks !== undefined) {
            this.langlinks = dto.langlinks;
        }
        if (dto.content !== undefined) {
            this.content = dto.content;
        }
        if (dto.keywords !== undefined) {
            this.keywords = dto.keywords;
        }
        if (dto.name !== undefined) {
            this.name = dto.name;
        }

        if (this.metadata === undefined) {
            this.metadata = {
                createdAt: Date.now(),
                createdBy: "system",
                contentLength: this.content.length,
            };
        }

        if (dto.metadata !== undefined) {
            this.metadata.updatedAt = dto.metadata.updatedAt || Date.now();
            this.metadata.updatedBy = dto.metadata.updatedBy || "system";
        }
    }

    getDto(): TextDto {
        const dto = new TextDto();
        dto.guid = this.guid;
        dto.organizationId = this.organizationGuid;
        dto.language = this.language;
        dto.langlinks = this.langlinks;
        dto.content = this.content;
        dto.keywords = this.keywords;
        dto.name = this.name;
        dto.metadata = this.metadata;
        return dto;
    }
}
