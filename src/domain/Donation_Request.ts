export enum Estado_solicitud {
    PENDIENTE = 'pendiente',
    ACEPTADA = 'aceptada',
    RECHAZADA = 'rechazada'
}
export interface DonationRequest {
    id_solicitud: string;
    id_donacion:string
    id_receptor: string;
    fecha_solicitud: Date;
    estado: Estado_solicitud;
    fecha_confirmacion?: Date;
}