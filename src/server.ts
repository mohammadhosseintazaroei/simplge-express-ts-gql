import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import { RegisterRoutes } from "../build/routes/routes";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
export class Application {
  #app = express();
  #PORT;
  constructor(PORT: string) {
    this.#PORT = PORT;
    this.ConfigApplication();
    this.CreateServer();
    this.CreateRoutes();
    this.ErrorHandeling();
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
          swaggerUi.generateHTML(await import("../build/swagger.json"))
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

  ErrorHandeling() {
    this.#app.use(function notFoundHandler(_req, res: Response) {
      res.status(404).send({
        message: "Not Found",
      });
    });
    this.#app.use(function errorHandler(
      err: unknown,
      req: Request,
      res: Response,
      next: NextFunction
    ): Response | void {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
          message: "Validation Failed",
          details: err?.fields,
        });
      }
      if (err instanceof Error) {
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      next();
    });
  }
}
