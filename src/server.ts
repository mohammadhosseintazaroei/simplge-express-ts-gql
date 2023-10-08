import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import mongoose, { Error } from "mongoose";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import { RegisterRoutes } from "../build/routes/routes";
dotenv.config();
import http from "http";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { CategoriesResolver } from "./categories/resolver/categories";
export class Application {
  #app = express();
  #PORT;
  #DB_URL;
  constructor(PORT: string, DB_URL: string) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URL;
    this.ConfigApplication();
    this.CreateServer();
    this.CreateRoutes();
    this.ConfigGraphql();
    this.ConnectToMongoDb();
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
  async ConfigGraphql() {
    const schema = await buildSchema({
      resolvers: [CategoriesResolver],
      emitSchemaFile: true,
      validate: false,
    });

    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
    });

    await server.start();
    server.applyMiddleware({ app: this.#app });
  }

  CreateServer() {
    const server = http.createServer(this.#app);
    server.listen(this.#PORT, () => {
      console.log(`http://localhost:${this.#PORT}/`);
    });
  }

  CreateRoutes() {
    RegisterRoutes(this.#app);
  }

  ConnectToMongoDb() {
    mongoose.connect(this.#DB_URL);
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDb");
    });
    mongoose.connection.on("disconnect", () => {
      console.log("MOngoDb is disconnected");
    });
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
    process.on("SIGTERM", async () => {
      await mongoose.connection.close();
      process.exit(0);
    });
  }

  ErrorHandeling() {
    this.#app.use((req, res, next) => {
      if (req.path === "/graphql") {
        return next();
      }
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
