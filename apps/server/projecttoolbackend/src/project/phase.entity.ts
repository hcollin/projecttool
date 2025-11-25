import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";
import type { IPhaseStart, IPhaseEnd, IPhaseAllocation } from "@frosttroll/projecttoolmodels";

@Entity()
export class PhaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", unique: true })
    guid!: string;

    @Column({ type: "varchar", nullable: false })
    organizationGuid!: string;

    @ManyToOne(() => ProjectEntity, (project) => project.phases)
    project!: ProjectEntity;

    @Column({ type: "varchar" })
    description?: string;

    @Column({ type: "jsonb", nullable: true })
    docItem?: string;

    @Column({ type: "jsonb" })
    start!: IPhaseStart;

    @Column({ type: "jsonb" })
    end!: IPhaseEnd;

    @Column({ type: "jsonb", default: "[]" })
    allocations!: IPhaseAllocation[];
}
