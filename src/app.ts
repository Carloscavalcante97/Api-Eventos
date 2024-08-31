import "dotenv/config";
import express, { Application } from "express";
import rotas from "./rotas";

const app: Application = express();

app.use(express.json());
app.use(rotas);
export default app;
