import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export abstract class RootEntity<T> {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", unique: true })
    guid!: string;

    @Column({ type: "varchar", nullable: false, default: "default-org" })
    organizationGuid!: string;

    constructor(data?: Partial<T>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    abstract updateFromDto<DTO>(dto: Partial<DTO>): void;
}
