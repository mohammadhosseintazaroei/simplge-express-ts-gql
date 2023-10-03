import { Router } from "express";
import { HomeController } from "../../controller/api/home.controller";

export const IndexRouter = Router();
IndexRouter.get("/", HomeController.indexPage);
