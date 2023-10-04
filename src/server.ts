import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { RegisterRoutes } from "../dist/routes/routes";
import bodyParser from "body-parser";

export class Application {
  #app = express();
  #PORT;
  constructor(PORT: string) {
    this.#PORT = PORT;
    this.ConfigApplication();
    this.CreateServer();
    this.CreateRoutes();
  }

  ConfigApplication() {
    this.#app.use(morgan("dev"));
    this.#app.use(express.json());
    this.#app.use(express.static("public"));
    this.#app.use(bodyParser.urlencoded({ extended: true }));
    this.#app.use(bodyParser.json());
  }

  CreateServer() {
    const http = require("http");
    const server = http.createServer(this.#app);
    server.listen(this.#PORT, () => {
      console.log(`http://localhost:${this.#PORT}/`);
    });
  }

  CreateRoutes() {
    RegisterRoutes(this.#app);
  }
}
