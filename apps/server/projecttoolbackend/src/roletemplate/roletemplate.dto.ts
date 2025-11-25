import { IRoleTemplate, ROLESENIORITY } from "@frosttroll/projecttoolmodels";
import { ApiProperty } from "@nestjs/swagger";
// import { ROLESENIORITY } from "@frosttroll/projecttoolmodels/dist/src/index.js";

export class RoleTemplateDTO implements IRoleTemplate {
    @ApiProperty({
        description:
            "The unique identifier of the role template. This does not equal to the generated primary key in database",
        required: false,
    })
    guid!: string;

    @ApiProperty({ description: "The name of the role template." })
    name!: string;

    @ApiProperty({ description: "A brief description of the role template.", required: false })
    description!: string;

    @ApiProperty({ description: "The seniority levels allowed for this role template." })
    seniorities!: ROLESENIORITY[];

    @ApiProperty({ description: "The groups this role template belongs to." })
    groups!: string[];
}
