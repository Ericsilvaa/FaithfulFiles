import { config } from "dotenv";
config()
import express from "express";
import cors from "cors";
import "reflect-metadata";
import router from "./routes/index.routes";


const app = express()
app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['OPTIONS', 'POST', 'GET']
}))

router(app)


export default app