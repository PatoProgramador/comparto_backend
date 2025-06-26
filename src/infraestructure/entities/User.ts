import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

export enum TipoUsuario {
  DONANTE = 'donante',
  RECEPTOR = 'receptor',
}

@Entity({ name: "usuarios" })
export class User {
  @PrimaryGeneratedColumn("uuid")
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

  @Column({
    type: "enum",
    enum: TipoUsuario,
    enumName: "tipo_usuario_enum",
  })
  tipo_usuario!: TipoUsuario;

  @Column({ type: "timestamp with time zone", default: () => 'CURRENT_TIMESTAMP' })
  fecha_registro!: Date;

  @Column({ type: "boolean", default: true })
  activo!: boolean;
}
