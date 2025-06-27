import { Ubications } from "./Ubications";

export interface UbicationsPort {
    createUbication(ubications: Ubications): Promise<string>;
    getUbicationById(id: string): Promise<Ubications | null>;
    getUbicationByName(nombre: string): Promise<Ubications | null>;
    getAllUbications(): Promise<Ubications[]>;
    updateUbication(id: string, ubications: Partial<Ubications>): Promise<boolean>;
    deleteUbication(id: string): Promise<Ubications | boolean>;
}
