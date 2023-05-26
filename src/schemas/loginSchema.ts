import { Joi } from "express-validation";
import { type UserAccess } from "../server/types";

const loginSchema = {
  body: Joi.object<UserAccess>({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default loginSchema;
