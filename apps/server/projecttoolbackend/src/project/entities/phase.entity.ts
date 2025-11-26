import { Column, Entity, ManyToOne } from "typeorm";
import { ProjectEntity } from "./project.entity";
import type { IPhaseStart, IPhaseEnd, IPhaseAllocation, IDocItem } from "@frosttroll/projecttoolmodels";
import { RootEntity } from "src/database/rootentity.entity";
import { PhaseDto } from "../dtos/phase.dto";
import { v4 } from "uuid";

@Entity()
export class PhaseEntity extends RootEntity<PhaseEntity> {
    @ManyToOne(() => ProjectEntity, (project) => project.phases)
    project!: ProjectEntity;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar", nullable: true })
    description?: string;

    @Column({ type: "jsonb", nullable: true })
    docItem?: IDocItem;

    @Column({ type: "jsonb" })
    start!: IPhaseStart;

    @Column({ type: "jsonb" })
    end!: IPhaseEnd;

    @Column({ type: "jsonb", default: "[]" })
    allocations!: IPhaseAllocation[];

    constructor(data?: Partial<PhaseEntity>) {
        super(data);
        if (!this.guid) {
            this.guid = v4();
        }
        if (!this.start) {
            this.start = { atProjectStart: true };
        }
        if (!this.end) {
            this.end = { atProjectEnd: true };
        }
        if (!this.allocations) {
            this.allocations = [];
        }
        if (!this.name) {
            this.name = "New phase";
        }
    }

    updateFromDto(dto: Partial<PhaseDto>): void {
        if (dto !== undefined) {
            this.name = dto.name || this.name;
            this.description = dto.description || this.description;
            this.docItem = dto.docItem || this.docItem;
            this.start = dto.start || this.start;
            this.end = dto.end || this.end;
            this.allocations = dto.allocations || this.allocations;
        }
    }
}
