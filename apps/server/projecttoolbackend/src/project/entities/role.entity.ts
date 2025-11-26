import { Column, Entity, ManyToOne } from "typeorm";
import { ProjectEntity } from "./project.entity";
import { RootEntity } from "src/database/rootentity.entity";
import { RoleDto } from "../dtos/role.dto";

@Entity()
export class RoleEntity extends RootEntity<RoleEntity> {
    @ManyToOne(() => ProjectEntity, (project) => project.roles)
    project!: ProjectEntity;

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

    constructor(data?: Partial<RoleEntity>) {
        super(data);
        if (!this.name) {
            this.name = "New Role";
        }
    }

    updateFromDto(dto: Partial<RoleDto>): void {
        if (dto !== undefined) {
            this.name = dto.name || this.name;
            this.personId = dto.personId || this.personId;
            this.templateId = dto.templateId || this.templateId;
            this.seniority = dto.seniority || this.seniority;
            this.priceGroupId = dto.priceGroupId || this.priceGroupId;
            this.description = dto.description || this.description;
        }
    }
}
