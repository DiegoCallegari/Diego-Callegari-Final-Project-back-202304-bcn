import { Joi, validate } from "express-validation";
import { type UserAccess } from "../server/types";

export const loginSchema = {
  body: Joi.object<UserAccess>({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const loginValidation = validate(loginSchema, {}, { abortEarly: false });
