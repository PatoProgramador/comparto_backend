"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: "public",
    entities: [User_1.User],
    synchronize: true,
    logging: true,
    ssl: {
        rejectUnauthorized: false
    }
});
const initDB = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log('Database connected');
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
};
exports.initDB = initDB;
