import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import notFoundError from "./middlewares/notFoundMiddleware/notFoundMiddleware.js";
import generalError from "./middlewares/generalErrorMiddleware/generalErrorMiddleware.js";
import paths from "./utils/paths.js";
import userRouter from "./routes/user/userRouter.js";
import ping from "./controllers/ping/pingController.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(morgan("dev"));

app.use(express.json());

app.get(paths.ping, ping);

app.use(paths.user, userRouter);

app.use(notFoundError);

app.use(generalError);
