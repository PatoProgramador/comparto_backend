import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { DonacionEntity } from "../entities/Donacion";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  schema: "public",
  entities: [User, DonacionEntity],
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
