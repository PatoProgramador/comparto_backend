import { Repository } from "typeorm";
import { DonacionEntity, EstadoDonacion } from "../entities/Donacion";
import { Donacion } from "../../domain/Donacion";
import { DonacionPort } from "../../domain/DonacionPort";
import { AppDataSource } from "../config/data-base";

export class DonacionAdapter implements DonacionPort {
  private donacionRepository: Repository<DonacionEntity>;

  constructor() {
    this.donacionRepository = AppDataSource.getRepository(DonacionEntity);
  }

  private toDomain(entity: DonacionEntity): Donacion {
    return {
      id_donacion: entity.id_donacion,
      id_donante: entity.id_donante,
      titulo: entity.titulo,
      descripcion: entity.descripcion,
      categoria: entity.categoria,
      cantidad: entity.cantidad,
      fecha_publicacion: entity.fecha_publicacion,
      fecha_vencimiento: entity.fecha_vencimiento,
      estado: entity.estado,
      direccion_recogida: entity.direccion_recogida,
    };
  }

  private toEntity(domain: Donacion): DonacionEntity {
    const entity = new DonacionEntity();
    entity.id_donante = domain.id_donante;
    entity.titulo = domain.titulo;
    entity.descripcion = domain.descripcion;
    entity.categoria = domain.categoria;
    entity.cantidad = domain.cantidad;
    entity.fecha_vencimiento = domain.fecha_vencimiento;
    entity.estado =
      (domain.estado as EstadoDonacion) || EstadoDonacion.DISPONIBLE;
    entity.direccion_recogida = domain.direccion_recogida;
    return entity;
  }

  async createDonacion(donacion: Donacion): Promise<Donacion> {
    try {
      const estadoParaQuery = donacion.estado || EstadoDonacion.DISPONIBLE;

      const newDonacionEntity = this.toEntity(donacion);

      if (donacion.coordenadas_recogida) {
        const query = `
 INSERT INTO donaciones (
            id_donante, titulo, descripcion, categoria, cantidad,
            fecha_vencimiento, estado, direccion_recogida, coordenadas_recogida_raw 
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, ST_SetSRID(ST_MakePoint($9, $10), 4326)
          ) RETURNING id_donacion, id_donante, titulo, descripcion, categoria, cantidad,
                      fecha_publicacion, fecha_vencimiento, estado, direccion_recogida,
                      ST_AsGeoJSON(coordenadas_recogida_raw) as geojson_coords;
        `;
        const result = await AppDataSource.manager.query(query, [
          newDonacionEntity.id_donante,
          newDonacionEntity.titulo,
          newDonacionEntity.descripcion,
          newDonacionEntity.categoria,
          newDonacionEntity.cantidad,
          newDonacionEntity.fecha_vencimiento,
          estadoParaQuery,
          newDonacionEntity.direccion_recogida,
          donacion.coordenadas_recogida.longitude,
          donacion.coordenadas_recogida.latitude,
        ]);
        const createdDonacion = this.toDomain(result[0]);
        if (result[0].geojson_coords) {
          const parsedCoords = JSON.parse(result[0].geojson_coords);
          createdDonacion.coordenadas_recogida = {
            latitude: parsedCoords.coordinates[1],
            longitude: parsedCoords.coordinates[0],
          };
        }
        return createdDonacion;
      } else {
        const savedEntity = await this.donacionRepository.save(
          newDonacionEntity
        );
        return this.toDomain(savedEntity);
      }
    } catch (error: any) {
      console.error("Error detallado al crear donacion en BD:", error);
      throw new Error("Error creando donación");
    }
  }

  async getDonacionById(id: string): Promise<Donacion | null> {
    try {
      const query = `
        SELECT
          id_donacion, id_donante, titulo, descripcion, categoria, cantidad,
          fecha_publicacion, fecha_vencimiento, estado, direccion_recogida,
          ST_AsGeoJSON(coordenadas_recogida_raw) as geojson_coords
        FROM donaciones
        WHERE id_donacion = $1;
      `;
      const result = await AppDataSource.manager.query(query, [id]);

      if (result.length > 0) {
        const row = result[0];
        const donacion = this.toDomain(row as DonacionEntity);
        if (row.geojson_coords) {
          const parsedCoords = JSON.parse(row.geojson_coords);
          donacion.coordenadas_recogida = {
            latitude: parsedCoords.coordinates[1],
            longitude: parsedCoords.coordinates[0],
          };
        }
        return donacion;
      }
      return null;
    } catch (error) {
      console.error("Error getting donacion by ID:", error);
      throw new Error("Error obteniendo donación por ID");
    }
  }

  async getAllDonaciones(filters?: {
    estado?: string;
    categoria?: string;
  }): Promise<Donacion[]> {
    try {
      let whereClause: string[] = [];
      const queryParams: any[] = [];
      let paramIndex = 1;

      if (filters?.estado) {
        whereClause.push(`estado = $${paramIndex++}`);
        queryParams.push(filters.estado);
      }
      if (filters?.categoria) {
        whereClause.push(`categoria = $${paramIndex++}`);
        queryParams.push(filters.categoria);
      }

      const queryString = `
        SELECT
          id_donacion, id_donante, titulo, descripcion, categoria, cantidad,
          fecha_publicacion, fecha_vencimiento, estado, direccion_recogida,
          ST_AsGeoJSON(coordenadas_recogida_raw) as geojson_coords
        FROM donaciones

        ORDER BY fecha_publicacion DESC;
      `;

      const result = await AppDataSource.manager.query(
        queryString,
        queryParams
      );

      return result.map((row: any) => {
        const donacion = this.toDomain(row as DonacionEntity);
        if (row.geojson_coords) {
          const parsedCoords = JSON.parse(row.geojson_coords);
          donacion.coordenadas_recogida = {
            latitude: parsedCoords.coordinates[1],
            longitude: parsedCoords.coordinates[0],
          };
        }
        return donacion;
      });
    } catch (error) {
      console.error("Error getting all donaciones:", error);
      throw new Error("Error obteniendo todas las donaciones");
    }
  }

  async updateDonacion(
    id: string,
    donacion: Partial<Donacion>
  ): Promise<boolean> {
    try {
      const existingDonacion = await this.donacionRepository.findOne({
        where: { id_donacion: id },
      });

      if (!existingDonacion) return false;

      // Actualizar campos individuales de la entidad existente
      if (donacion.titulo !== undefined)
        existingDonacion.titulo = donacion.titulo;
      if (donacion.descripcion !== undefined)
        existingDonacion.descripcion = donacion.descripcion;
      if (donacion.categoria !== undefined)
        existingDonacion.categoria = donacion.categoria;
      if (donacion.cantidad !== undefined)
        existingDonacion.cantidad = donacion.cantidad;
      if (donacion.fecha_vencimiento !== undefined)
        existingDonacion.fecha_vencimiento = donacion.fecha_vencimiento;
      if (donacion.estado !== undefined)
        existingDonacion.estado = donacion.estado as EstadoDonacion;
      if (donacion.direccion_recogida !== undefined)
        existingDonacion.direccion_recogida = donacion.direccion_recogida;

      // Manejo de coordenadas geográficas para actualización
      if (donacion.coordenadas_recogida) {
        const updateCoordsQuery = `
          UPDATE donaciones
          SET coordenadas_recogida_raw = ST_SetSRID(ST_MakePoint($1, $2), 4326)
          WHERE id_donacion = $3;
        `;
        await AppDataSource.manager.query(updateCoordsQuery, [
          donacion.coordenadas_recogida.longitude,
          donacion.coordenadas_recogida.latitude,
          id,
        ]);
      }

      await this.donacionRepository.save(existingDonacion); // Guarda los demás campos actualizados por TypeORM
      return true;
    } catch (error) {
      console.error("Error updating donacion:", error);
      throw new Error("Error actualizando donación");
    }
  }

  async deleteDonacion(id: string): Promise<boolean> {
    try {
      const result = await this.donacionRepository.delete(id);
      return result.affected !== 0;
    } catch (error) {
      console.error("Error deleting donacion:", error);
      throw new Error("Error eliminando donación");
    }
  }
}
