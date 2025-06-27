import { Repository } from "typeorm";
import { DonationRequest as DonaReDomain } from "../../domain/Donation_Request";
import { DonationRequestPort } from "../../domain/Donation_RequestPort";
import { DonationRequest as DonReEntity } from "../entities/Donation_Request";
import { AppDataSource } from "../config/data-base";





export class Donation_RequestAdapter implements DonationRequestPort {

    private donationRequestRepository:Repository<DonReEntity>;
    constructor() {
        this.donationRequestRepository = AppDataSource.getRepository(DonReEntity);
    }
    
   
    private toDomain(donationRequest: DonReEntity): DonaReDomain {
        return {
            id_solicitud: donationRequest.id_solicitud,
            id_donacion: donationRequest.id_donacion,
            id_receptor: donationRequest.id_receptor,
            fecha_solicitud: donationRequest.fecha_solicitud,
            estado: donationRequest.estado,
            fecha_confirmacion: donationRequest.fecha_confirmacion
        };
    }

    private toEntity(donationRequest: Omit<DonaReDomain, "id_solicitud">): DonReEntity {
        const donationrequestentity = new DonReEntity();
        donationrequestentity.id_donacion = donationRequest.id_donacion;
        donationrequestentity.id_receptor = donationRequest.id_receptor;
        donationrequestentity.fecha_solicitud = donationRequest.fecha_solicitud;
        donationrequestentity.estado = donationRequest.estado;
        donationrequestentity.fecha_confirmacion = donationRequest.fecha_confirmacion;
        return donationrequestentity;
    }

    async createDonationRequest(donationRequest: Omit<DonaReDomain, "id_solicitud">): Promise<string> {
        try {
            const newDonationRequest = this.toEntity(donationRequest);
            const savedDonationRequest = await this.donationRequestRepository.save(newDonationRequest);
            return savedDonationRequest.id_solicitud; 
        } catch (error) {
            console.error("Error creating donation request", error);
            throw new Error("Error creating donation request");
        }
    }
    async updateDonationRequest(id_solicitud: string, donationRequest: Partial<DonaReDomain>): Promise<boolean> {
    try {
        const existingDonReq = await this.donationRequestRepository.findOne({
        where: { id_solicitud: id_solicitud }
        });

        if (!existingDonReq) throw new Error("Donation request not found");

        // Detectar si el estado cambió
        const estadoAnterior = existingDonReq.estado;
        const estadoNuevo = donationRequest.estado ?? estadoAnterior;

        // Actualizar campos con fallback
        Object.assign(existingDonReq, {
        id_donacion: donationRequest.id_donacion ?? existingDonReq.id_donacion,
        id_receptor: donationRequest.id_receptor ?? existingDonReq.id_receptor,
        fecha_solicitud: donationRequest.fecha_solicitud ?? existingDonReq.fecha_solicitud,
        estado: estadoNuevo,
        fecha_confirmacion: estadoNuevo !== estadoAnterior ? new Date() : existingDonReq.fecha_confirmacion
        });

        await this.donationRequestRepository.save(existingDonReq);
        return true;

    } catch (error) {
        console.error("Error updating donation request", error);
        throw new Error("Error updating donation request");
    }
    }

    async deleteDonationRequest(id_solicitud: string): Promise<boolean> {
        try {
            const existingDonReq = await this.donationRequestRepository.findOne({
                where: { id_solicitud : id_solicitud }
            });
            if (!existingDonReq) throw new Error("Donation request not found");
            await this.donationRequestRepository.remove(existingDonReq);
            return true;
        } catch (error) {
            console.error("Error deleting donation request", error);
            throw new Error("Error deleting donation request"); 
        }
    }

    async getDonationRequestById(id_solicitud: string): Promise<DonaReDomain | null> {
        try {
            const donreq = await this.donationRequestRepository.findOne({
                where: { id_solicitud: id_solicitud }
            });
            return donreq ? this.toDomain(donreq) : null;
        } catch (error) {
            console.error("Error getting donation request by ID", error);
            console.error(`❌ No se encontró solicitud con ID: ${id_solicitud}`);
            throw new Error("Error getting donation request by ID");        
        }
    }

    async getDonationRequestsByReceiverId(id_receptor: string): Promise<DonaReDomain | null> {
        try {
            const donrerec= await this.donationRequestRepository.findOne({
                where: { id_receptor: id_receptor }
            });
            return donrerec ? this.toDomain(donrerec) : null;
        } catch (error) {
            console.error("Error getting donation request by receiver id", error);
            console.error(`❌ No se encontró solicitud con ID: ${id_receptor}`);
            throw new Error("Error getting donation request by receiver id");
        }
    }
    async getDonationRequestsByDonorId(id_donacion: string): Promise<DonaReDomain | null> {
        try {
            const donrenon = await this.donationRequestRepository.findOne({
                where: { id_donacion: id_donacion }
            });
            return donrenon ? this.toDomain(donrenon) : null;
        } catch (error) {
            console.error("Error getting donation requests by donor id", error);
            throw new Error("Error getting donation requests by donor id");
        }
    }
    getAlldonationRequests(): Promise<DonaReDomain[]> {
        try{
            const allDonReq = this.donationRequestRepository.find();
            return allDonReq.then(donationRequests => donationRequests.map(this.toDomain));
        } catch (error) {
            console.error("Error getting all donation requests", error);
            throw new Error("Error getting all donation requests");
        }
    }
    getDonationRequestByDonationAndReceiverId(id_donacion: string, id_receptor: string): Promise<DonaReDomain | null> {
        try {
            const donreq = this.donationRequestRepository.findOne({
                where: { id_donacion: id_donacion, id_receptor: id_receptor }
            });
            return donreq.then(donationRequest => donationRequest ? this.toDomain(donationRequest) : null);
        } catch (error) {
            console.error("Error getting donation request by donation and receiver id", error);
            throw new Error("Error getting donation request by donation and receiver id");
        }
    }
    
}