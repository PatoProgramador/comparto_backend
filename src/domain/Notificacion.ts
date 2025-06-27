export interface Notificacion {
  id_notificacion?: string;
  id_usuario: string;
  tipo_notificacion: string;
  mensaje: string;
  leida?: boolean;
  fecha_creacion?: Date;
  id_referencia?: string | null;
}
