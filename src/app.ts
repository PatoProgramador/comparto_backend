import express from 'express';
import dotenv from 'dotenv';
import {initDB} from "./infraestructure/config/data-base";

dotenv.config();

export const startApp = async () => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json());

  await initDB();

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};
