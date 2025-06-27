import { Request, Response } from "express";
import { DonacionApplicationService } from "../../application/DonacionApplicationService";
import { Donacion } from "../../domain/Donacion";

export class DonacionController {
  private donacionService: DonacionApplicationService;

  constructor(donacionService: DonacionApplicationService) {
    this.donacionService = donacionService;
  }

  async createDonacion(req: Request, res: Response): Promise<Response> {
    try {
      const donacionData: Donacion = req.body;
      const newDonacion = await this.donacionService.createDonacion(
        donacionData
      );
      return res.status(201).json({
        message: "Donación creada exitosamente",
        data: newDonacion,
      });
    } catch (error: any) {
      console.error("Error al crear donación:", error);
      return res.status(400).json({
        error: "Datos inválidos para crear donación",
        details: error.message,
      });
    }
  }

  async getDonacionById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "El id es obligatorio." });
      }
      const donacion = await this.donacionService.getDonacionById(id);
      if (donacion) {
        return res.status(200).json({
          message: "Donación obtenida exitosamente",
          data: donacion,
        });
      } else {
        return res.status(404).json({
          error: "Donación no encontrada",
        });
      }
    } catch (error: any) {
      console.error("Error al obtener donación por ID:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
        details: error.message,
      });
    }
  }

  async getAllDonaciones(req: Request, res: Response): Promise<Response> {
    try {
      const { estado, categoria } = req.query;
      const filters = {
        ...(estado && { estado: String(estado) }),
        ...(categoria && { categoria: String(categoria) }),
      };
      const donaciones = await this.donacionService.getAllDonaciones(filters);
      return res.status(200).json({
        message: "Donaciones obtenidas exitosamente",
        data: donaciones,
      });
    } catch (error: any) {
      console.error("Error al obtener todas las donaciones:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
        details: error.message,
      });
    }
  }

  async updateDonacion(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "El id es obligatorio." });
      }
      const updateData: Partial<Donacion> = req.body;

      const updated = await this.donacionService.updateDonacion(id, updateData);
      if (updated) {
        const donacion = await this.donacionService.getDonacionById(id);
        return res.status(200).json({
          message: "Donación actualizada exitosamente",
          data: donacion,
        });
      } else {
        return res.status(404).json({
          error: "Donación no encontrada",
        });
      }
    } catch (error: any) {
      console.error("Error al actualizar donación:", error);
      return res.status(400).json({
        error: "No se pudo actualizar la donación",
        details: error.message,
      });
    }
  }

  async deleteDonacion(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "El id es obligatorio." });
      }
      const deleted = await this.donacionService.deleteDonacion(id);
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({
          error: "Donación no encontrada",
        });
      }
    } catch (error: any) {
      console.error("Error al eliminar donación:", error);
      return res.status(400).json({
        error: "No se pudo eliminar la donación",
        details: error.message,
      });
    }
  }
}
