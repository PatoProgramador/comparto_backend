export interface Donacion {
  id_donacion?: string;
  id_donante: string;
  titulo: string;
  descripcion: string;
  categoria?: string;
  cantidad?: string;
  fecha_publicacion?: Date;
  fecha_vencimiento?: Date;
  estado?: "disponible" | "pendiente" | "recogida" | "cancelada";
  direccion_recogida?: string;
  coordenadas_recogida?: {
    latitude: number;
    longitude: number;
  };
}
