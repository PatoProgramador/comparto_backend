import { Repository } from "typeorm";
import { NotificacionEntity } from "../entities/Notificacion";
import { Notificacion } from "../../domain/Notificacion";
import { NotificacionPort } from "../../domain/NotificacionPort";
import { AppDataSource } from "../config/data-base";

export class NotificacionAdapter implements NotificacionPort {
  private notificacionRepository: Repository<NotificacionEntity>;

  constructor() {
    this.notificacionRepository =
      AppDataSource.getRepository(NotificacionEntity);
  }

  private toDomain(entity: NotificacionEntity): Notificacion {
    return {
      id_notificacion: entity.id_notificacion,
      id_usuario: entity.id_usuario,
      tipo_notificacion: entity.tipo_notificacion,
      mensaje: entity.mensaje,
      leida: entity.leida,
      fecha_creacion: entity.fecha_creacion,
      id_referencia: entity.id_referencia,
    };
  }

  private toEntity(domain: Notificacion): NotificacionEntity {
    const entity = new NotificacionEntity();
    entity.id_usuario = domain.id_usuario;
    entity.tipo_notificacion = domain.tipo_notificacion;
    entity.mensaje = domain.mensaje;
    entity.leida = domain.leida ?? false;
    entity.id_referencia = domain.id_referencia ?? null;
    return entity;
  }

  async createNotificacion(notificacion: Notificacion): Promise<Notificacion> {
    try {
      const newNotificacionEntity = this.toEntity(notificacion);
      const savedEntity = await this.notificacionRepository.save(
        newNotificacionEntity
      );
      return this.toDomain(savedEntity);
    } catch (error: any) {
      console.error("Error detallado al crear notificación en BD:", error);
      throw new Error("Error creando notificación");
    }
  }

  async getNotificacionById(id: string): Promise<Notificacion | null> {
    try {
      const notification = await this.notificacionRepository.findOne({
        where: { id_notificacion: id },
      });
      return notification ? this.toDomain(notification) : null;
    } catch (error: any) {
      console.error("Error obteniendo notificación por ID:", error);
      throw new Error("Error obteniendo notificación por ID");
    }
  }

  async getNotificacionesByUserId(
    userId: string,
    filters?: { leida?: boolean }
  ): Promise<Notificacion[]> {
    try {
      const whereCondition: any = { id_usuario: userId };
      if (filters?.leida !== undefined) {
        whereCondition.leida = filters.leida;
      }
      const notifications = await this.notificacionRepository.find({
        where: whereCondition,
        order: { fecha_creacion: "DESC" },
      });
      return notifications.map(this.toDomain);
    } catch (error: any) {
      console.error(
        "Error obteniendo notificaciones por ID de usuario:",
        error
      );
      throw new Error("Error obteniendo notificaciones por ID de usuario");
    }
  }

  async updateNotificacion(
    id: string,
    updateData: Partial<Notificacion>
  ): Promise<boolean> {
    try {
      const result = await this.notificacionRepository.update(
        { id_notificacion: id },
        { leida: updateData.leida }
      );
      return result.affected !== 0;
    } catch (error: any) {
      console.error("Error actualizando notificación:", error);
      throw new Error("Error actualizando notificación");
    }
  }

  async deleteNotificacion(id: string): Promise<boolean> {
    try {
      const result = await this.notificacionRepository.delete(id);
      return result.affected !== 0;
    } catch (error: any) {
      console.error("Error eliminando notificación:", error);
      throw new Error("Error eliminando notificación");
    }
  }
}
