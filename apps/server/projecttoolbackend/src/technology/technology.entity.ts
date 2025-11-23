import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Technology {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", unique: true })
    guid!: string;

    @Column({ type: "varchar", default: "" })
    name!: string;

    @Column({ type: "varchar", default: "" })
    description!: string;

    @Column({ type: "simple-array", default: "" })
    category!: string[];

    @Column({ type: "simple-array", default: "" })
    appLayer!: string[];
}
