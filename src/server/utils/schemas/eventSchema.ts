import { Joi } from "express-validation";
import { type EventStructure } from "../../types";

export const createEventSchema = {
  body: Joi.object<EventStructure>({
    title: Joi.string().required(),
    image: Joi.string().required(),
    neighbourhood: Joi.string().required(),
    description: Joi.string(),
    date: Joi.date(),
    category: Joi.string(),
  }),
};
