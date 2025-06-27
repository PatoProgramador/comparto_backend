"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./infraestructure/config/environment-vars");
const server_bootstrap_1 = require("./infraestructure/bootstrap/server.bootstrap");
const app_1 = __importDefault(require("./infraestructure/web/app"));
const data_base_1 = require("./infraestructure/config/data-base");
const server = new server_bootstrap_1.ServerBootstrap(app_1.default);
(async () => {
    try {
        //Conect to the database
        await (0, data_base_1.initDB)();
        console.log('Database connected');
        // Initialize the server
        const instances = [server.init()];
        await Promise.all(instances);
    }
    catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);
    }
})();
