"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBootstrap = void 0;
const http_1 = __importDefault(require("http"));
class ServerBootstrap {
    constructor(app) {
        this.app = app;
    }
    init() {
        return new Promise((resolve, reject) => {
            const server = http_1.default.createServer(this.app);
            const PORT = process.env.PORT || 4000;
            server.listen(PORT)
                .on("listening", () => {
                console.log(`Servidor escuchando en el puerto ${PORT}`);
                resolve(true);
            })
                .on("error", (err) => {
                console.error(`Error al iniciar el servidor: ${err}`);
                reject(false);
            });
        });
    }
}
exports.ServerBootstrap = ServerBootstrap;
