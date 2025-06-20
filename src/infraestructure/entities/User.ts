import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "usuarios" })
export class User {
  @PrimaryGeneratedColumn()
  id_usuario!: string;

  @Column({ type: "varchar", length: 100 })
  nombre!: string;

  @Column({ type: "varchar", length: 100 })
  apellido!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 255 })
  contrasena_hash!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  telefono?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  direccion?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  ciudad?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  departamento?: string;

  @Column({ type: "varchar", length: 50 })
  tipo_usuario!: string;

  @Column({ type: "timestamp" })
  fecha_registro!: Date;

  @Column({ type: "boolean", default: true })
  activo!: boolean;
}
