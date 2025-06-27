import { Notificacion } from "./Notificacion";

export interface NotificacionPort {
  createNotificacion(notificacion: Notificacion): Promise<Notificacion>;
  getNotificacionById(id: string): Promise<Notificacion | null>;
  getNotificacionesByUserId(
    userId: string,
    filters?: { leida?: boolean }
  ): Promise<Notificacion[]>;
  updateNotificacion(
    id: string,
    updateData: Partial<Notificacion>
  ): Promise<boolean>;
  deleteNotificacion(id: string): Promise<boolean>;
}
