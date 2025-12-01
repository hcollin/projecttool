import { IOrganization } from "@frosttroll/projecttoolmodels";
import { ApiProperty } from "@nestjs/swagger";

export class OrganizationDto implements IOrganization {
    @ApiProperty({ description: "The unique identifier of the organization." })
    guid!: string;

    @ApiProperty({ description: "The name of the organization." })
    name!: string;

    @ApiProperty({ description: "The description of the organization.", required: false })
    description?: string;
}
