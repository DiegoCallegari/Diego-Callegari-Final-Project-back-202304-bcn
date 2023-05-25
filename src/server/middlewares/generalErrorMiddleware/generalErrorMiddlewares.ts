import createdebug from "debug";
import { type CustomError } from "../../../CustomError/CustomError.js";
import { type NextFunction, type Request, type Response } from "express";
import chalk from "chalk/index.js";

const debug = createdebug("quefem-api:server:middlewares:errorMiddlewares");

const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(`Error: ${chalk.red(error.message)}`);

  const statusCode = error.statusCode || 500;

  const message = error.statusCode ? error.message : "General error";

  res.status(statusCode).json({ message });
};

export default generalError;
