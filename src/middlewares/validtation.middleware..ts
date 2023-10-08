import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { plainToClass, plainToInstance } from "class-transformer";

export function validationMiddleware(type: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const input = plainToInstance(type, req.body);
    validate(input).then((errors) => {
      if (errors.length > 0) {
        res.status(400).json(errors);
      } else {
        req.body = input; // Override req.body with validated class instance
        next();
      }
    });
  };
}
