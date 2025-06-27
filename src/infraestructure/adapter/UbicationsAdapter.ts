import { ILike, Repository } from "typeorm";
import { Ubications as UbicationsDomain } from "../../domain/Ubications";
import { Ubications as UbicationsEntity } from "../entities/Ubications";
import { AppDataSource } from "../config/data-base";
import { UbicationsPort } from "../../domain/UbicationsPort";


export class UbicationsAdapter implements UbicationsPort {
    private ubicationsRepository: Repository<UbicationsEntity>;

    constructor() {
        this.ubicationsRepository = AppDataSource.getRepository(UbicationsEntity);
    }
    

    private toDomain(ubications: UbicationsEntity): UbicationsDomain {
        return {
            id: ubications.id,
            nombre: ubications.nombre,
            descripcion: ubications.descripcion,
            is_ciudad: ubications.is_ciudad
        };
    }

    private toEntity(ubications: Omit<UbicationsDomain, "id">): UbicationsEntity {
        const ubicationEntity = new UbicationsEntity();
        ubicationEntity.nombre = ubications.nombre;
        ubicationEntity.descripcion = ubications.descripcion;
        ubicationEntity.is_ciudad = ubications.is_ciudad;
        return ubicationEntity;
    }

    async createUbication(ubications: Omit<UbicationsDomain, "id">): Promise<string> {
        try {
            const newUbication = this.toEntity(ubications);
            const savedUbication = await this.ubicationsRepository.save(newUbication);
            return savedUbication.id; 
        } catch (error) {
            console.error("Error creating ubication", error);
            throw new Error("Error creating ubication");
        }
    }
    async updateUbication(id: string, ubications: Partial<UbicationsDomain>): Promise<boolean> {
        try {
            const existingUbication = await this.ubicationsRepository.findOne({ where: { id } });
            if (!existingUbication) throw new Error("Ubication not found");

            Object.assign(existingUbication, {
                nombre: ubications.nombre ?? existingUbication.nombre,
                descripcion: ubications.descripcion ?? existingUbication.descripcion,
                is_ciudad: ubications.is_ciudad ?? existingUbication.is_ciudad
            });
            await this.ubicationsRepository.save(existingUbication);
            return true;
        } catch (error) {
            console.error("Error updating ubication", error);
            throw new Error("Error updating ubication");
        }
    }
    async deleteUbication(id: string): Promise<boolean> {
        try {
            const ubication = await this.ubicationsRepository.findOne({ where: { id } });
            if (!ubication) throw new Error("Ubication not found");

            await this.ubicationsRepository.remove(ubication);
            return true;
        } catch (error) {
            console.error("Error deleting ubication", error);
            throw new Error("Error deleting ubication");
        }
    }
    async getUbicationById(id: string): Promise<UbicationsDomain | null> {
        try {
            const ubicationid = await this.ubicationsRepository.findOne({ where: { id } });
            return ubicationid ? this.toDomain(ubicationid) : null;
        } catch (error) {
            console.error("Error fetching ubication by ID", error);
            console.error(`❌ No se encontró ubicacion con ID: ${id}`);
            throw new Error("Error fetching ubication by ID");
        }
    }


    async getAllUbications(): Promise<UbicationsDomain[]> {
        try {
            const ubicationsList = await this.ubicationsRepository.find();
            return ubicationsList.map(this.toDomain);
        } catch (error) {
            console.error("Error fetching all ubications", error);
            throw new Error("Error fetching all ubications");
        }
    }
    

    async getUbicationByName(nombre: string): Promise<UbicationsDomain | null> {
        try {
            const ubicationname = await this.ubicationsRepository.findOne({
                where: { nombre: ILike(`%${nombre}%`) }
            });
            return ubicationname ? this.toDomain(ubicationname) : null;
        } catch (error) {
            console.error("Error fetching ubication by name", error);
            throw new Error("Error fetching ubication by name");
        }
    }

}