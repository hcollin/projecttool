import { CURRENCY, HOLIDAY_TUPLE, IFixedPrice, IHourlyPriceGroup, IProject } from "@frosttroll/projecttoolmodels";
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { RoleDto } from "./role.dto";
import { PhaseDto } from "./phase.dto";

export class ProjectDto implements IProject {
    @ApiProperty({ description: "The ID of the organization this project belongs to." })
    organizationId!: string;

    @ApiProperty({ description: "The unique identifier of the project." })
    guid!: string;

    @ApiProperty({ description: "The codename of the project." })
    codename!: string;

    @ApiProperty({ description: "The real name of the project.", required: false })
    realname?: string;

    @ApiProperty({ description: "The name of the client for whom the project is executed.", required: false })
    clientName?: string;

    @ApiProperty({ description: "A brief description of the project.", required: false })
    description?: string | undefined;

    @ApiProperty({ description: "The start timestamp of the project." })
    start!: number; // timestamp

    @ApiProperty({ description: "The end timestamp of the project." })
    end!: number; // timestamp

    @ApiProperty({ description: "List of project flags/labels." })
    flags!: string[]; // list of project flags/labels

    @ApiProperty({ description: "List of holidays as [day, month] tuples.", required: false })
    holidays?: HOLIDAY_TUPLE[]; // list of [day, month] tuples that are considered holidays in addition to weekends and public holidays

    @ApiProperty({ description: "The pricing details of the project, including hourly price groups and fixed prices." })
    prices!: {
        hourlypricegroups: IHourlyPriceGroup[];
        fixedprices: IFixedPrice[];
    };

    @ApiProperty({ description: "The phases of the project.", type: [PhaseDto] })
    @ApiExtraModels(PhaseDto)
    phases!: PhaseDto[];

    @ApiProperty({ description: "The roles associated with the project.", type: [RoleDto] })
    @ApiExtraModels(RoleDto)
    roles!: RoleDto[];

    @ApiProperty({ description: "The target budget of the project.", required: false })
    targetBudget?: number;

    @ApiProperty({ description: "The currency used in the project." })
    currency!: CURRENCY;

    @ApiProperty({ description: "The technology stack used in the project." })
    techStack!: {
        frontend: string[];
        backend: string[];
        data: string[];
        platform: string[];
        tools: string[];
    };
}
