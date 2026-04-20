import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import { ZodError } from "zod";

async function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.errorCode).json({
      message: error.errorMessage,
      error,
    });
  } else if (error instanceof ZodError) {
    return res.status(422).json({
      message: error.issues.map((i) => i.message),
      error,
    });
  }

  return res.status(200).json({
    success: false,
    message: error?.message || "Something went wrong",
    error,
  });
}

export default errorHandler;
