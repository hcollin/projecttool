import { IRole, ROLESENIORITY } from "@frosttroll/projecttoolmodels";
import { ApiProperty } from "@nestjs/swagger";

export class RoleDto implements IRole {
    @ApiProperty({ description: "The unique identifier of the role." })
    guid!: string;
    @ApiProperty({ description: "The ID of the organization this role belongs to." })
    organizationId!: string;
    @ApiProperty({ description: "The name of the role." })
    name!: string;
    @ApiProperty({ description: "A brief description of the role.", required: false })
    description?: string;
    @ApiProperty({
        description: "The ID of the person associated with the role. Currently not yet implemented.",
        required: false,
    })
    personId?: string;
    @ApiProperty({ description: "The template ID associated with the role.", required: false })
    templateId?: string;
    @ApiProperty({ description: "The seniority level of the role.", required: false, enum: ROLESENIORITY })
    seniority?: ROLESENIORITY | undefined;
    @ApiProperty({ description: "The price group ID associated with the role.", required: false })
    priceGroupId?: string;
}
