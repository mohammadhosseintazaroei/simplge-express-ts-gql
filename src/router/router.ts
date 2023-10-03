import { Router } from "express";
import { IndexRouter } from "./api";
const router = Router().use("/", IndexRouter);

export default router;