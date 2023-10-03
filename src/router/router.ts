import { Router } from "express";
import { IndexRouter } from "./api";
export const router = Router().use("/", IndexRouter);

