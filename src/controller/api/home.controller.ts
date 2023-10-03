import { NextFunction, Request, Response } from "express";

class Home {
  async indexPage(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).send("Index Page Store");
    } catch (error) {
      next(error);
    }
  }
}

export const HomeController = new Home();
