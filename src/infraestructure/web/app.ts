import express, { Request, Response } from "express";
import AuthRoutes from "../routes/AuthRoutes";
import UserRoutes from "../routes/UserRoutes";
import DonacionRoutes from "../routes/DonacionRoutes";
import NotificacionRoutes from "../routes/NotificacionRoutes";
import cors from "cors";

class App {
  private app: express.Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: "*" }));
  }
  private routes(): void {
    this.app.use("/api/users", UserRoutes);
    this.app.use("/api/auth", AuthRoutes);
    this.app.use("/api/donaciones", DonacionRoutes);
    this.app.use("/api/notificaciones", NotificacionRoutes);
  }

  getApp() {
    return this.app;
  }
}
export default new App().getApp();
