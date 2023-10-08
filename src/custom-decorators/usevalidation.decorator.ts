import { Middlewares } from 'tsoa';
import { validationMiddleware } from '../middlewares/validtation.middleware.';

export function UseValidation(type: any) {
  return Middlewares(validationMiddleware(type));
}
