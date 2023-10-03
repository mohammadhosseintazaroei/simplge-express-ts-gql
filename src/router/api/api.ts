import { Router } from "express";
import { HomeController } from "../../controller/api";

export const IndexRouter = Router();
IndexRouter.get("/", HomeController.indexPage);