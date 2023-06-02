import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import dbCon from "./db";
import { TaytureServer } from "./setup";

class Application {
  public initialize(): void {
    dbCon();
    const app: Express = express();
    const server = new TaytureServer(app);
    server.start();
  }
}

const app = new Application();
app.initialize();
