import express, { Request, Response } from "express";
import AuthRoutes from "../routes/AuthRoutes";
import UserRoutes from "../routes/UserRoutes";
<<<<<<< Updated upstream
import DonacionRoutes from "../routes/DonacionRoutes";
import NotificacionRoutes from "../routes/NotificacionRoutes";
import cors from "cors";
=======
import cors from 'cors';
import Donation_RequestRoutes from '../routes/Donation_RequestRoutes';
import UbicationsRoutes from '../routes/UbicationsRoutes';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    this.app.use("/api/auth", AuthRoutes);
    this.app.use("/api/donaciones", DonacionRoutes);
    this.app.use("/api/notificaciones", NotificacionRoutes);
=======
    this.app.use('/api/auth', AuthRoutes);
    this.app.use("/api/donations-requests", Donation_RequestRoutes);
    this.app.use("/api/ubications", UbicationsRoutes);
>>>>>>> Stashed changes
  }

  getApp() {
    return this.app;
  }
}
export default new App().getApp();
