import { NextFunction, Request, Response } from "express";

class Home {
  async indexPage(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export const HomeController = new Home();
