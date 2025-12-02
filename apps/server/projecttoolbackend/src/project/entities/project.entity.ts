import { IDocFile, IFixedPrice, IHourlyPriceGroup } from "@frosttroll/projecttoolmodels";
import { Column, Entity, OneToMany } from "typeorm";
import { RoleEntity } from "./role.entity";
import { PhaseEntity } from "./phase.entity";
import { ProjectDto } from "../dtos/project.dto";
import { RootEntity } from "src/database/rootentity.entity";

@Entity()
export class ProjectEntity extends RootEntity<ProjectEntity> {
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

    @Column({ type: "jsonb", nullable: true })
    docs?: {
        projectplan?: IDocFile | null | undefined;
        solutionplan?: IDocFile | null | undefined;
        [key: string]: IDocFile | null | undefined;
    };

    updateFromDto(prjDto: Partial<ProjectDto>): void {
        if (prjDto !== undefined) {
            this.codename = prjDto.codename || this.codename;
            this.realname = prjDto.realname || this.realname;
            this.clientName = prjDto.clientName || this.clientName;
            this.description = prjDto.description || this.description;
            this.start = prjDto.start || this.start;
            this.end = prjDto.end || this.end;
            this.flags = prjDto.flags || this.flags;
            this.holidays = (prjDto.holidays as [number, number][]) || this.holidays;
            this.targetBudget = prjDto.targetBudget || this.targetBudget;
            this.currency = prjDto.currency || this.currency;
            this.tech_frontend = prjDto.techStack?.frontend || this.tech_frontend;
            this.tech_backend = prjDto.techStack?.backend || this.tech_backend;
            this.tech_data = prjDto.techStack?.data || this.tech_data;
            this.tech_platform = prjDto.techStack?.platform || this.tech_platform;
            this.tech_tools = prjDto.techStack?.tools || this.tech_tools;
            this.hourPriceGroups = prjDto.prices?.hourlypricegroups || this.hourPriceGroups;
            this.fixedPrices = prjDto.prices?.fixedprices || this.fixedPrices;
            this.docs = prjDto.docs || this.docs;
        }
    }
}
