import express, {Request, Response} from 'express';
import AuthRoutes from "../routes/AuthRoutes";
import UserRoutes from "../routes/UserRoutes";

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
    this.app.use("/api/users", UserRoutes);
    this.app.use('/api/auth', AuthRoutes);
  }

  getApp(){
    return this.app;
  }
}
export default new App().getApp();
