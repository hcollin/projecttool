import { IText } from "@frosttroll/projecttoolmodels";
import { ApiProperty } from "@nestjs/swagger";

export class TextDto implements IText {
    @ApiProperty({ description: "The unique identifier of the text." })
    guid!: string;

    @ApiProperty({ description: "The unique identifier of the organization." })
    organizationId!: string;

    @ApiProperty({ description: "The content of the text." })
    content!: string;

    @ApiProperty({ description: "The keywords associated with the text.", type: [String] })
    keywords!: string[];

    @ApiProperty({ description: "The name of the text." })
    name!: string;

    @ApiProperty({ description: "The language code of the text." })
    language!: string;

    @ApiProperty({
        description: "Mapping for different language versions of the text.",
        type: "object",
        additionalProperties: { type: "string" },
    })
    langlinks?: Record<string, string>;

    @ApiProperty({
        description: "Metadata information about the text. This is generated automatically in the backend.",
        type: "object",
        properties: {
            createdAt: { type: "number", description: "Timestamp of creation" },
            createdBy: { type: "string", description: "Identifier GUID of the creator" },
            updatedAt: { type: "number", nullable: true, description: "Timestamp of last update" },
            updatedBy: { type: "string", nullable: true, description: "Identifier GUID of the last updater" },
            contentLength: { type: "number", nullable: true, description: "Length of the content" },
        },
    })
    metadata?: {
        createdAt: number;
        createdBy: string;
        updatedAt?: number;
        updatedBy?: string;
        contentLength: number;
    };
}
