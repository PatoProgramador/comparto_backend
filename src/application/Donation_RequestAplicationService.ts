import { DonationRequestPort } from "../domain/Donation_RequestPort";
import { DonationRequest } from "../domain/Donation_Request";


export class DonationRequestApplicationService {
   

    private port : DonationRequestPort;
    constructor(port: DonationRequestPort) {
        this.port = port;
    }

    //Metodos 
    async createDonationRequest(newDonationRequest: DonationRequest) {
        return await this.port.createDonationRequest(newDonationRequest);
    }
    async getDonationRequestById(id_solicitud: string): Promise<DonationRequest | null> {
        return await this.port.getDonationRequestById(id_solicitud);
    }
    async getDonationRequestsByReceiverId(id_receptor: string): Promise<DonationRequest | null> {
        return await this.port.getDonationRequestsByReceiverId(id_receptor);
    }
    async getDonationRequestsByDonorId(id_donacion: string): Promise<DonationRequest| null> {
        return await this.port.getDonationRequestsByDonorId(id_donacion);
    }
    async getAllDonationRequests(): Promise<DonationRequest[]> {
        return await this.port.getAlldonationRequests();
    }        
    async updateDonationRequest(id_solicitud: string, donationRequest: Partial<DonationRequest>): Promise<boolean> {
        const existingRequest = await this.port.getDonationRequestById(id_solicitud);
        if (!existingRequest) {
            throw new Error("Donation request not found");
        }
        return await this.port.updateDonationRequest(id_solicitud, donationRequest);
    }
    async deleteDonationRequest(id_solicitud: string): Promise<DonationRequest | boolean> {
        const existingRequest = await this.port.getDonationRequestById(id_solicitud);
        if (!existingRequest) {
            throw new Error("Donation request not found");
        }
        return await this.port.deleteDonationRequest(id_solicitud);
    }
}