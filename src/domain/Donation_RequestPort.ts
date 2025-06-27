import { DonationRequest } from "./Donation_Request";

export interface DonationRequestPort {
    createDonationRequest(donationRequest: DonationRequest): Promise<string>;
    getDonationRequestById(id_solicitud: string): Promise<DonationRequest | null>;
    getDonationRequestsByReceiverId(id_receptor: string): Promise<DonationRequest | null>;
    getDonationRequestsByDonorId(id_donacion: string): Promise<DonationRequest | null>;
    getDonationRequestByDonationAndReceiverId(id_donacion: string, id_receptor: string): Promise<DonationRequest | null>;
    getAlldonationRequests(): Promise<DonationRequest[]>;
    updateDonationRequest(id_solicitud: string, donationRequest: Partial<DonationRequest>): Promise<boolean>;
    deleteDonationRequest(id_solicitud: string): Promise<DonationRequest | boolean>;
}