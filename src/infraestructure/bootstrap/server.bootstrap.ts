import express from 'express';
import http from 'http';

export class ServerBootstrap {
  //Declarar atributos
  private app!: express.Application;
  constructor(app:express.Application) {
    this.app = app;
  }

  init(): Promise<boolean>{
    return new Promise((resolve, reject)=> {

      const server = http.createServer(this.app);
      const PORT =process.env.PORT || 4000;
      server.listen(PORT)
        .on ("listening", ()=>{
          console.log(`Servidor escuchando en el puerto ${PORT}`);
          resolve(true);
        })
        .on("error", (err) => {
          console.error(`Error al iniciar el servidor: ${err}`);
          reject(false);
        })
    });
  }
}
