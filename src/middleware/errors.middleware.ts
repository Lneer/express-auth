import { NextFunction, Request, Response } from "express";
import APiError from "../services/errors.service";
import { FieldValidationError, Result } from "express-validator";

const errorsMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof APiError) {
    res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: err.message });
};

export default errorsMiddleware;
