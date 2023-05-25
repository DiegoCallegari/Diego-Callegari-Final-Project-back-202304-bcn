import express from "express";
import morgan from "morgan";
import cors from "cors";
import notFoundError from "./middlewares/notFoundMiddleware/notFoundMiddleware.js";
import generalError from "./middlewares/generalErrorMiddleware/generalErrorMiddlewares.js";
import pingController from "./controllers/pingController/pingController.js";
import paths from "./paths/paths.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(morgan("dev"));

app.use(express.json());

app.get(paths.pingController, pingController);

app.use(notFoundError);

app.use(generalError);
