import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

export enum EstadoDonacion {
  DISPONIBLE = "disponible",
  PENDIENTE = "pendiente",
  RECOGIDA = "recogida",
  CANCELADA = "cancelada",
}

@Entity({ name: "donaciones" })
export class DonacionEntity {
  @PrimaryGeneratedColumn("uuid")
  id_donacion!: string;

  @Column({ type: "uuid" })
  id_donante!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_donante" })
  donante!: User;

  @Column({ type: "varchar", length: 255 })
  titulo!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  categoria?: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  cantidad?: string;

  @Column({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  fecha_publicacion!: Date;

  @Column({ type: "date", nullable: true })
  fecha_vencimiento?: Date;

  @Column({
    type: "enum",
    enum: EstadoDonacion,
    enumName: "estado_donacion_enum",
    default: EstadoDonacion.DISPONIBLE,
  })
  estado!: EstadoDonacion;

  @Column({ type: "text", nullable: true })
  direccion_recogida?: string;

  @Column({
    type: "geometry",
    srid: 4326,
    nullable: true,
    select: false,
  })
  coordenadas_recogida_raw?: any;
}
