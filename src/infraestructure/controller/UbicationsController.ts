import { UbicationsApplicationService } from "../../application/UbicationsApplicationService";
import { Ubications } from "../../domain/Ubications";
import { Response, Request } from "express";


export class UbicationsController {
    private app : UbicationsApplicationService;

    constructor(app : UbicationsApplicationService) {
        this.app = app;
    }

    async createUbication(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre,descripcion , is_ciudad } = req.body;

            if (!nombre || !descripcion || is_ciudad === undefined) {

                return res.status(400).json({ message: "Todos los campos son obligatorios" });
                
            }

            const newUbication: Ubications = {
                nombre, descripcion, is_ciudad,
                id: ""
            };
            const createdUbication = await this.app.createUbication(newUbication);
            return res.status(201).json({ id: createdUbication });
        } catch (error) {
            console.error("Error creando ubicación:", error);
            return res.status(500).json({ message: "Error creando ubicación" });
        }
    }

    async getUbicationById(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "El id debe ser un texto invalido" });
            }
            const ubication = await this.app.getUbicationById(id);
            if (!ubication) {
                return res.status(404).json({ message: "Ubicación no encontrada" });
            }
            return res.status(200).json(ubication);
        } catch (error) {
            console.error("Error obteniendo ubicación por ID:", error);
            return res.status(500).json({ message: "Error obteniendo ubicación por ID" });
        }
    }

    async getUbicationByName(req: Request, res: Response): Promise<Response> {
        try {
            const nombre = req.params.nombre;
            if (!nombre) {
                return res.status(400).json({ message: "El nombre debe ser un texto invalido" });
            }
            const ubication = await this.app.getUbicationByName(nombre);
            if (!ubication) {
                return res.status(404).json({ message: "Ubicación no encontrada" });
            }
            return res.status(200).json(ubication);
        } catch (error) {
            console.error("Error obteniendo ubicación por nombre:", error);
            return res.status(500).json({ message: "Error obteniendo ubicación por nombre" });
        }
    }

    async getAllUbications(req: Request, res: Response): Promise<Response> {
        try {
            const ubications = await this.app.getAllUbications();
            return res.status(200).json(ubications);
        } catch (error) {
            console.error("Error obteniendo todas las ubicaciones:", error);
            return res.status(500).json({ message: "Error obteniendo todas las ubicaciones" });
        }
    }
    async updateUbication(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "El id es obligatorio." });
            }

            const { nombre,descripcion, is_ciudad } = req.body;
            const updatedUbication = await this.app.updateUbication(id, { nombre,descripcion, is_ciudad });
            if (!updatedUbication) {
                return res.status(404).json({ message: "Ubicación no encontrada" });
            }
            return res.status(200).json({ message: "Ubicación actualizada correctamente" });
        } catch (error) {
            console.error("Error actualizando ubicación:", error);
            return res.status(500).json({ message: "Error actualizando ubicación" });
        }
    }

    async deleteUbication(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "El id debe ser un texto invalido" });
            }
            const deletedUbication = await this.app.deleteUbication(id);
            if (!deletedUbication) {
                return res.status(404).json({ message: "Ubicación no encontrada" });
            }
            return res.status(200).json({ message: "Ubicación eliminada correctamente" });
        } catch (error) {
            console.error("Error eliminando ubicación:", error);
            return res.status(500).json({ message: "Error eliminando ubicación" });
        }
    }
}