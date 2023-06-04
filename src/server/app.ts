import "../loadEnvironment.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import notFoundError from "./middlewares/notFoundMiddleware/notFoundMiddleware.js";
import generalError from "./middlewares/generalErrorMiddleware/generalErrorMiddleware.js";
import paths from "./utils/paths.js";
import userRouter from "./routes/user/userRouter.js";
import ping from "./controllers/ping/pingController.js";
import eventsRouter from "./routes/events/eventsRouter.js";
import { auth } from "./middlewares/authMiddleware/authMiddleware.js";

const allowedOrigins = [
  process.env.ALLOWED_ORIGINS_DEV!,
  process.env.ALLOWED_ORIGINS_PROD!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(express.json());

app.use(morgan("dev"));

app.get(paths.ping, ping);

app.use(paths.user, userRouter);

app.use(paths.events, auth, eventsRouter);

app.use(notFoundError);

app.use(generalError);
