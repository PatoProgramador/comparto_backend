import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "ubicaciones" })
export class Ubications {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar", length: 255 })
    nombre!: string;

    @Column({ type: "varchar", length: 255 })
    descripcion!: string;

    @Column({ type: "boolean", default: false })
    is_ciudad!: boolean;
}