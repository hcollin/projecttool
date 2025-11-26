import { IFixedPrice, IHourlyPriceGroup } from "@frosttroll/projecttoolmodels/dist/src/index.js";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { PhaseEntity } from "./phase.entity";

@Entity()
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", unique: true })
    guid!: string;

    @Column({ type: "varchar", nullable: false })
    organizationGuid!: string;

    @Column({ type: "varchar", nullable: false })
    codename!: string;

    @Column({ type: "varchar", nullable: true })
    realname?: string;

    @Column({ type: "varchar", nullable: true })
    clientName?: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "bigint", default: 0 })
    start!: number;

    @Column({ type: "bigint", default: 0 })
    end!: number;

    @Column({ type: "simple-array", default: "" })
    flags!: string[];

    @Column({ type: "money", nullable: true })
    targetBudget?: number;

    @Column({ type: "varchar", default: "EUR" })
    currency!: string;

    @Column({ type: "simple-array", default: "" })
    tech_frontend!: string[];

    @Column({ type: "simple-array", default: "" })
    tech_backend!: string[];

    @Column({ type: "simple-array", default: "" })
    tech_data!: string[];

    @Column({ type: "simple-array", default: "" })
    tech_platform!: string[];

    @Column({ type: "simple-array", default: "" })
    tech_tools!: string[];

    @Column({ type: "jsonb", default: "[]" })
    hourPriceGroups!: IHourlyPriceGroup[];

    @Column({ type: "jsonb", default: "[]" })
    fixedPrices!: IFixedPrice[];

    @Column({ type: "simple-json", default: "[]" })
    holidays!: [number, number][];

    @OneToMany(() => RoleEntity, (role) => role.project, { cascade: true })
    roles!: RoleEntity[];

    @OneToMany(() => PhaseEntity, (phase) => phase.project, { cascade: true })
    phases!: PhaseEntity[];
}
