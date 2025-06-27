import { Donacion } from "./Donacion";

export interface DonacionPort {
  createDonacion(donacion: Donacion): Promise<Donacion>;
  getDonacionById(id: string): Promise<Donacion | null>;
  getAllDonaciones(filters?: {
    estado?: string;
    categoria?: string;
  }): Promise<Donacion[]>;
  updateDonacion(id: string, donacion: Partial<Donacion>): Promise<boolean>;
  deleteDonacion(id: string): Promise<boolean>;
}
