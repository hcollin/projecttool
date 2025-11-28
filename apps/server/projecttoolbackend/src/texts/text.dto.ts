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
}
