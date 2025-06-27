"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRoutes_1 = __importDefault(require("../routes/AuthRoutes"));
const UserRoutes_1 = __importDefault(require("../routes/UserRoutes"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use("/api/users", UserRoutes_1.default);
        this.app.use('/api/auth', AuthRoutes_1.default);
    }
    getApp() {
        return this.app;
    }
}
exports.default = new App().getApp();
