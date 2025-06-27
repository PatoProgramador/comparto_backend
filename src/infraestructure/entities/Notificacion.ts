import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "notificaciones" })
export class NotificacionEntity {
  @PrimaryGeneratedColumn("uuid")
  id_notificacion!: string;

  @Column({ type: "uuid" })
  id_usuario!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_usuario" })
  usuario!: User;

  @Column({ type: "varchar", length: 100 })
  tipo_notificacion!: string;

  @Column({ type: "text" })
  mensaje!: string;

  @Column({ type: "boolean", default: false })
  leida!: boolean;

  @Column({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  fecha_creacion!: Date;

  @Column({ type: "uuid", nullable: true })
  id_referencia?: string | null;
}
