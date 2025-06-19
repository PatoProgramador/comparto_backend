// Aqui se gestionan las rutas de la aplicación
import express, {Request, Response} from 'express';

class App{
  private app: express.Application;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }
  private routes():void {
    // this.app.use("/api", userRoutes);
  }

  getApp(){
    return this.app;
  }
}
export default new App().getApp();
