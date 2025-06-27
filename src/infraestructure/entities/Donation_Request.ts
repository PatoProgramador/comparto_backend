import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Estado_solicitud } from "../../domain/Donation_Request";

@Entity({ name: "solicitudes_donacion" })
export class DonationRequest {
    @PrimaryGeneratedColumn("uuid")
    id_solicitud!: string;
    
    @Column({ type: "uuid" })    
    id_donacion!: string;

    @Column({ type: "uuid" })
    id_receptor!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    fecha_solicitud!: Date;

    @Column({ type: "enum", enum: Estado_solicitud, default: Estado_solicitud.PENDIENTE })
    estado!: Estado_solicitud;    

    @Column({ type: "timestamp", nullable: true })
    fecha_confirmacion?: Date;
    
}