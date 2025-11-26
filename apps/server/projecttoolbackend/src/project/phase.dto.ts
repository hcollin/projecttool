import type { IDocItem, IPhase, IPhaseAllocation, IPhaseEnd, IPhaseStart } from "@frosttroll/projecttoolmodels";
import { ApiProperty } from "@nestjs/swagger";

export class PhaseDto implements IPhase {
    @ApiProperty({ description: "The unique identifier of the phase." })
    guid!: string;

    @ApiProperty({ description: "The ID of the organization this phase belongs to." })
    organizationId!: string;
    @ApiProperty({ description: "The name of the phase." })
    name!: string;
    @ApiProperty({ description: "A brief description of the phase.", required: false })
    description?: string;
    @ApiProperty({ description: "The documentation item associated with the phase.", required: false })
    docItem?: IDocItem | undefined;
    @ApiProperty({ description: "The start details of the phase.", type: Object })
    start!: IPhaseStart;
    @ApiProperty({ description: "The end details of the phase.", type: Object })
    end!: IPhaseEnd;
    @ApiProperty({ description: "The allocations within the phase.", type: [Object] })
    allocations!: IPhaseAllocation[];
}
