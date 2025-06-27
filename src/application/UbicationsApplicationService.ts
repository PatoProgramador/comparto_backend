import { UbicationsPort } from "../domain/UbicationsPort";
import { Ubications } from "../domain/Ubications";

export class UbicationsApplicationService {
    private ubiPort: UbicationsPort;

    constructor(ubiPort: UbicationsPort) {
        this.ubiPort = ubiPort;
    }

    async createUbication(newUbication: Ubications): Promise<string> {
        return await this.ubiPort.createUbication(newUbication);
    }
    async getUbicationById(id: string): Promise<Ubications | null> {
        return await this.ubiPort.getUbicationById(id);
    }
    async getUbicationByName(nombre: string): Promise<Ubications | null> {
        return await this.ubiPort.getUbicationByName(nombre);
    }
    async getAllUbications(): Promise<Ubications[]> {
        return await this.ubiPort.getAllUbications();
    }
    async updateUbication(id: string, ubication: Partial<Ubications>): Promise<boolean> {
        const existingUbication = await this.ubiPort.getUbicationById(id);
        if (!existingUbication) {
            throw new Error("Ubication not found");
        }
        return await this.ubiPort.updateUbication(id, ubication);
    }
    async deleteUbication(id: string): Promise<Ubications | boolean> {
        const existingUbication = await this.ubiPort.getUbicationById(id);
        if (!existingUbication) {
            throw new Error("Ubication not found");
        }
        return await this.ubiPort.deleteUbication(id);
    }   

}