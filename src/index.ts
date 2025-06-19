import "./infraestructure/config/environment-vars";
import { ServerBootstrap } from './infraestructure/bootstrap/server.bootstrap';
import app from './infraestructure/web/app';
import { initDB } from "./infraestructure/config/data-base";

const server = new ServerBootstrap(app);

(
  async () => {
    try {
      //Conect to the database
      await initDB();
      console.log('Database connected');
      // Initialize the server
      const instances = [server.init()];
      await Promise.all(instances);
    } catch (error) {
      console.error('Error starting the server:', error);
      process.exit(1);
    }
  }
)();
