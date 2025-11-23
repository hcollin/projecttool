import { ITechnology } from "@frosttroll/projecttoolmodels";
import { ETECHAPPLICATIONLAYER, ETECHCATEGORY } from "@frosttroll/projecttoolmodels/dist/src/index.js";
import { ApiProperty } from "@nestjs/swagger";

export class TechnologyDTO implements ITechnology {
    @ApiProperty({ description: "The unique identifier of the technology.", required: false })
    guid!: string;

    @ApiProperty({ description: "The name of the technology." })
    name!: string;

    @ApiProperty({ description: "A brief description of the technology.", required: false })
    description!: string;

    @ApiProperty({ description: "The categories this technology belongs to." })
    category!: ETECHCATEGORY[];

    @ApiProperty({ description: "The application layers this technology is associated with." })
    appLayer!: ETECHAPPLICATIONLAYER[];
}
