import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { RegisterRoutes } from "../dist/routes/routes";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
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
    this.#app.use(
      "/docs",
      swaggerUi.serve,
      async (_req: Request, res: Response) => {
        return res.send(
          swaggerUi.generateHTML(await import("../dist/swagger.json"))
        );
      }
    );
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
