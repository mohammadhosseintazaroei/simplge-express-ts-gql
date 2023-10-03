import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Router from "./router/router";
dotenv.config();
const app: Express = express();
const port = process.env.PORT;

export class Application {
  #app = express();
  #PORT;
  constructor(PORT: string) {
    this.#PORT = PORT;
    this.CreateServer();
    this.CreateRoutes();
  }

  CreateServer() {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(this.#PORT, () => {
      console.log(`http://localhost:${this.#PORT}/`);
    });
  }

  CreateRoutes() {
    this.#app.use(Router);
  }

}
