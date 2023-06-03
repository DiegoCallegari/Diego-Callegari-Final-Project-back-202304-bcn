import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import { CustomError } from "../../../CustomError/CustomError.js";
import Event from "../../../database/models/Event.js";

const debug = createDebug(
  "quefem-api:server:controllers:event:eventsController.js"
);

const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const events = await Event.find().limit(10).exec();
    res.status(200).json({ events });
  } catch (error) {
    error.message = "Database error connection";
    debug(error);
    next(CustomError);
  }
};

export default getEvents;
