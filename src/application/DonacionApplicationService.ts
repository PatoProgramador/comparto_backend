import { Donacion } from "../domain/Donacion";
import { DonacionPort } from "../domain/DonacionPort";

export class DonacionApplicationService {
  private donacionPort: DonacionPort;

  constructor(donacionPort: DonacionPort) {
    this.donacionPort = donacionPort;
  }

  async createDonacion(donacionData: Donacion): Promise<Donacion> {
    if (
      !donacionData.id_donante ||
      !donacionData.titulo ||
      !donacionData.descripcion
    ) {
      throw new Error(
        "Los campos 'id_donante', 'titulo' y 'descripcion' son obligatorios."
      );
    }
    return this.donacionPort.createDonacion(donacionData);
  }

  async getDonacionById(id: string): Promise<Donacion | null> {
    return this.donacionPort.getDonacionById(id);
  }

  async getAllDonaciones(filters?: {
    estado?: string;
    categoria?: string;
  }): Promise<Donacion[]> {
    return this.donacionPort.getAllDonaciones(filters);
  }

  async updateDonacion(
    id: string,
    updateData: Partial<Donacion>
  ): Promise<boolean> {
    const existingDonacion = await this.donacionPort.getDonacionById(id);
    if (!existingDonacion) {
      throw new Error("Donación no encontrada.");
    }

    if (
      updateData.estado &&
      !["disponible", "pendiente", "recogida", "cancelada"].includes(
        updateData.estado
      )
    ) {
      throw new Error("Estado de donación inválido.");
    }

    return this.donacionPort.updateDonacion(id, updateData);
  }

  async deleteDonacion(id: string): Promise<boolean> {
    const existingDonacion = await this.donacionPort.getDonacionById(id);
    if (!existingDonacion) {
      throw new Error("Donación no encontrada.");
    }
    if (existingDonacion.estado === "recogida") {
      throw new Error(
        "No se puede eliminar una donación que ya ha sido recogida."
      );
    }
    return this.donacionPort.deleteDonacion(id);
  }
}
