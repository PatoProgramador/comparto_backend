import { DonationRequestApplicationService } from "../../application/Donation_RequestAplicationService";
import { Request, Response } from "express";
import { DonationRequest, Estado_solicitud } from "../../domain/Donation_Request";





export class Donation_RequestController {
    private app : DonationRequestApplicationService;
    constructor(app: DonationRequestApplicationService) {
        this.app = app;
    }

    async createDonationRequest(req: Request, res: Response): Promise<Response> {
        try {
            const { id_donacion, id_receptor } = req.body;

            if (!id_donacion || !id_receptor ) {
                return res.status(400).json({ message: "Todos los campos son obligatorios" });
            }

            const newDonationRequest: DonationRequest = {
                id_donacion,
                id_receptor,
                fecha_solicitud: new Date(),
                estado: Estado_solicitud.PENDIENTE, // Estado inicial,
                fecha_confirmacion: undefined // Inicialmente no hay confirmación
                ,
                id_solicitud: ""
            };

            const createdRequest = await this.app.createDonationRequest(newDonationRequest);
            return res.status(201).json(createdRequest);
        } catch (error) {
            console.error("Error creando solicitud:", error);
            return res.status(500).json({ message: "Error creando solicitud de donación" });
        }
    }
    async getDonationRequestById( req : Request, res : Response) {
        try {
            const id = req.params.id_solicitud;
            if (!id) {
                return res.status(400).json({ message: "El id debe ser un texto invalido" });
            }
            const donationRequest = await this.app.getDonationRequestById(id);
            if (!donationRequest) {
                return res.status(404).json({ message: "Donation request not found" });
            }
            return res.status(200).json(donationRequest);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({
                    error: "Error interno del Servidor controller",
                    details: error.message,
                });
            }
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async getDonationRequestsByReceiverId(req: Request, res: Response) {
        try {
            const id = req.params.id_receptor;
            if (!id) {
                return res.status(400).json({ message: "El id debe ser un texto invalido" });
            }
            const donationRequests = await this.app.getDonationRequestsByReceiverId(id);
            if (!donationRequests) {
                return res.status(404).json({ message: "Donation requests not found" });
            }
            return res.status(200).json(donationRequests);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error controller" });
        }
    }

    async getDonationRequestsByDonorId(req: Request, res: Response) {
        try {
            const id = req.params.id_donacion;
            if (!id) {
                return res.status(400).json({ message: "El id debe ser un texto invalido" });
            }
            const donationRequests = await this.app.getDonationRequestsByDonorId(id);
            if (!donationRequests) {
                return res.status(404).json({ message: "Donation requests not found" });
            }
            return res.status(200).json(donationRequests);
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error controller" });
        }
    }

    async getAllDonationRequests(req: Request, res: Response) {
        try {
            const donationRequests = await this.app.getAllDonationRequests();
            return res.status(200).json(donationRequests);
        } catch (error) {
            console.error("❌ Error en getAllDonationRequests:", error);
            return res.status(500).json({ message: "Internal Server Error controller" });
        }
    }

    async updateDonationRequest(req: Request, res: Response): Promise<Response> {
    try {
        const id = req.params.id_solicitud;

        if (!id) {
            return res.status(400).json({ message: "ID de solicitud inválido" });
        }

        const {
            id_donacion,
            id_receptor,
            fecha_solicitud,
            estado
        } = req.body;

         // Verificar que el receptor exista
    //    if (id_receptor && id_receptor !== id_receptor) {
    //         const receptor = await this.userRepository.findOne({ where: { id_usuario: id_receptor } });
    //         if (!receptor) {
    //             return res.status(404).json({ message: "Receptor no encontrado" });
    //         }
    //         id_receptor = id_receptor;
    //     }

        // Establecer fecha_confirmacion dependiendo del estado
        const fecha_confirmacion = (estado === "aceptada" || estado === "rechazada")
            ? new Date()
            : undefined;

        const updateDonationRequest: Partial<DonationRequest> = {
            id_donacion,
            id_receptor,
            fecha_solicitud,
            estado,
            fecha_confirmacion
        };

        const updated = await this.app.updateDonationRequest(id, updateDonationRequest);

        return res.status(200).json({ message: "Solicitud actualizada correctamente" });
    } catch (error) {
        console.error("Error actualizando solicitud:", error);
        return res.status(500).json({ message: "Error actualizando solicitud de donación" });
    }
    }
    async deleteDonationRequest(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id_solicitud;
            if (!id) {
                return res.status(400).json({ message: "ID de solicitud inválido" });
            }
            const deleted = await this.app.deleteDonationRequest(id);
            if (!deleted) {
                return res.status(404).json({ message: "Solicitud de donación no encontrada" });
            }
            return res.status(200).json({ message: "Solicitud de donación eliminada correctamente" });
        } catch (error) {
            console.error("Error eliminando solicitud:", error);
            return res.status(500).json({ message: "Error eliminando solicitud de donación" });
        }
    }

}