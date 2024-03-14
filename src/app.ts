import { config } from "dotenv";
config()
import express, { Express } from "express";
import cors from "cors";
import "reflect-metadata";
import router from "./api/routes/index.routes";


export default (): Express => {
  const app = express()

  app.set('port', process.env.PORT || 5001)
  app.use(express.json());
  app.use(cors({
    origin: '*',
    methods: ['OPTIONS', 'POST', 'GET']
  }))

  router(app)



  return app
}