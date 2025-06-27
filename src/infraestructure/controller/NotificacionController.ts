import { Request, Response } from "express";
import { NotificacionApplicationService } from "../../application/NotificacionApplicationService";
import { Notificacion } from "../../domain/Notificacion";

export class NotificacionController {
  private notificacionService: NotificacionApplicationService;

  constructor(notificacionService: NotificacionApplicationService) {
    this.notificacionService = notificacionService;
  }
  async createNotificacion(req: Request, res: Response): Promise<Response> {
    try {
      const notificacionData: Notificacion = req.body;
      const newNotificacion = await this.notificacionService.createNotificacion(
        notificacionData
      );
      return res.status(201).json({
        message: "Notificación creada exitosamente",
        data: newNotificacion,
      });
    } catch (error: any) {
      console.error("Error al crear notificación:", error);
      return res.status(400).json({
        error: "Datos inválidos para crear notificación",
        details: error.message,
      });
    }
  }

  async getNotificacionById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ message: "El ID de la notificación es obligatorio." });
      }
      const notificacion = await this.notificacionService.getNotificacionById(
        id
      );
      if (notificacion) {
        return res.status(200).json({
          message: "Notificación obtenida exitosamente",
          data: notificacion,
        });
      } else {
        return res.status(404).json({
          error: "Notificación no encontrada",
        });
      }
    } catch (error: any) {
      console.error("Error al obtener notificación por ID:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
        details: error.message,
      });
    }
  }

  async getNotificacionesByUserId(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { idUsuario } = req.params;
      if (!idUsuario) {
        return res
          .status(400)
          .json({ message: "El ID de usuario es obligatorio." });
      }
      const { leida } = req.query;
      const filters: { leida?: boolean } = {};
      if (leida !== undefined) {
        filters.leida = String(leida).toLowerCase() === "true";
      }

      const notificaciones =
        await this.notificacionService.getNotificacionesByUserId(
          idUsuario,
          filters
        );
      return res.status(200).json({
        message: "Notificaciones obtenidas exitosamente",
        data: notificaciones,
      });
    } catch (error: any) {
      console.error(
        "Error al obtener notificaciones por ID de usuario:",
        error
      );
      return res.status(500).json({
        error: "Error interno del servidor",
        details: error.message,
      });
    }
  }

  async updateNotificacion(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ message: "El ID de la notificación es obligatorio." });
      }
      const updateData: Partial<Notificacion> = req.body;

      const updated = await this.notificacionService.updateNotificacion(
        id,
        updateData
      );
      if (updated) {
        const notificacion = await this.notificacionService.getNotificacionById(
          id
        );
        return res.status(200).json({
          message: "Notificación actualizada exitosamente",
          data: notificacion,
        });
      } else {
        return res.status(404).json({
          error: "Notificación no encontrada",
        });
      }
    } catch (error: any) {
      console.error("Error al actualizar notificación:", error);
      return res.status(400).json({
        error: "No se pudo actualizar la notificación",
        details: error.message,
      });
    }
  }

  async deleteNotificacion(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ message: "El ID de la notificación es obligatorio." });
      }
      const deleted = await this.notificacionService.deleteNotificacion(id);
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({
          error: "Notificación no encontrada",
        });
      }
    } catch (error: any) {
      console.error("Error al eliminar notificación:", error);
      return res.status(400).json({
        error: "No se pudo eliminar la notificación",
        details: error.message,
      });
    }
  }
}
