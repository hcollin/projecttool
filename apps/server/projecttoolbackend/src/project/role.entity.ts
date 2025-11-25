import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "./project.entity";

@Entity()
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => ProjectEntity, (project) => project.roles)
    project!: ProjectEntity;

    @Column({ type: "varchar", unique: true })
    guid!: string;

    @Column({ type: "varchar" })
    organizationGuid!: string;

    @Column({ type: "varchar" })
    name!: string;

    @Column({ type: "varchar", nullable: true })
    personId?: string;

    @Column({ type: "varchar", nullable: true })
    templateId?: string;

    @Column({ type: "varchar", nullable: true })
    seniority?: string;

    @Column({ type: "varchar", nullable: true })
    priceGroupId?: string;

    @Column({ type: "varchar", nullable: true })
    description?: string;
}
