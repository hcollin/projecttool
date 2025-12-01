import { RootEntity } from "src/database/rootentity.entity";
import { Column, Entity } from "typeorm";
import { v4 } from "uuid";
import { OrganizationDto } from "./organization.dto";

@Entity()
export class OrganizationEntity extends RootEntity<OrganizationEntity> {
    @Column({ type: "text", default: "" })
    name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    constructor(data?: Partial<OrganizationEntity>) {
        super(data);
        if (!this.guid) {
            this.guid = v4();
        }
        if (!this.name) {
            this.name = "Default Organization";
        }
        if (!this.description) {
            this.description = "Default Description";
        }
    }

    updateFromDto(dto: Partial<OrganizationDto>): void {
        if (dto.guid !== undefined) {
            this.guid = dto.guid;
        }
        if (dto.name !== undefined) {
            this.name = dto.name;
        }
        if (dto.description !== undefined) {
            this.description = dto.description;
        }
    }

    getDto(): OrganizationDto {
        const dto = new OrganizationDto();
        dto.guid = this.guid;
        dto.name = this.name;
        dto.description = this.description;
        return dto;
    }
}
