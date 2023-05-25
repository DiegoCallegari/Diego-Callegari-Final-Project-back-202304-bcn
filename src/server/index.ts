import express from "express";
import morgan from "morgan";
import cors from "cors";

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.disable("x-powered-by");

app.use(cors(options));

app.use(morgan("dev"));

app.use(express.json());
