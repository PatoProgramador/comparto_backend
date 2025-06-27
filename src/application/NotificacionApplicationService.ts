import { Notificacion } from "../domain/Notificacion";
import { NotificacionPort } from "../domain/NotificacionPort";

export class NotificacionApplicationService {
  private notificacionPort: NotificacionPort;

  constructor(notificacionPort: NotificacionPort) {
    this.notificacionPort = notificacionPort;
  }

  async createNotificacion(
    notificacionData: Notificacion
  ): Promise<Notificacion> {
    if (
      !notificacionData.id_usuario ||
      !notificacionData.tipo_notificacion ||
      !notificacionData.mensaje
    ) {
      throw new Error(
        "Los campos 'id_usuario', 'tipo_notificacion' y 'mensaje' son obligatorios."
      );
    }
    const newNotificacion: Notificacion = {
      ...notificacionData,
      leida: notificacionData.leida ?? false,
    };
    return this.notificacionPort.createNotificacion(newNotificacion);
  }

  async getNotificacionById(id: string): Promise<Notificacion | null> {
    return this.notificacionPort.getNotificacionById(id);
  }

  async getNotificacionesByUserId(
    userId: string,
    filters?: { leida?: boolean }
  ): Promise<Notificacion[]> {
    if (!userId) {
      throw new Error(
        "El ID de usuario es obligatorio para obtener notificaciones."
      );
    }
    return this.notificacionPort.getNotificacionesByUserId(userId, filters);
  }

  async updateNotificacion(
    id: string,
    updateData: Partial<Notificacion>
  ): Promise<boolean> {
    const existingNotificacion =
      await this.notificacionPort.getNotificacionById(id);
    if (!existingNotificacion) {
      throw new Error("Notificación no encontrada.");
    }

    if (
      updateData.leida === undefined ||
      typeof updateData.leida !== "boolean"
    ) {
      throw new Error(
        "Solo se permite actualizar el campo 'leida' y debe ser un booleano."
      );
    }

    const allowedUpdates: Partial<Notificacion> = { leida: updateData.leida };

    return this.notificacionPort.updateNotificacion(id, allowedUpdates);
  }

  async deleteNotificacion(id: string): Promise<boolean> {
    const existingNotificacion =
      await this.notificacionPort.getNotificacionById(id);
    if (!existingNotificacion) {
      throw new Error("Notificación no encontrada.");
    }
    return this.notificacionPort.deleteNotificacion(id);
  }
}
