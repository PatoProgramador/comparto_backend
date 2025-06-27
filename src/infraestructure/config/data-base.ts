<<<<<<< Updated upstream
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { DonacionEntity } from "../entities/Donacion";
import { NotificacionEntity } from "../entities/Notificacion";
import dotenv from "dotenv";
=======
import { DataSource } from 'typeorm';
import { User } from '../entities/User';
import dotenv from 'dotenv';
import { DonationRequest } from '../entities/Donation_Request';
import { Ubications } from '../entities/Ubications';
>>>>>>> Stashed changes

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
<<<<<<< Updated upstream
  schema: "public",
  entities: [User, DonacionEntity, NotificacionEntity],
=======
  schema:"public",
  entities: [User, DonationRequest,Ubications],
>>>>>>> Stashed changes
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
