import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import Event from "../../../database/models/Event.js";
import { type CustomRequest } from "../../types.js";
import { CustomError } from "../../../CustomError/CustomError.js";
import { Types } from "mongoose";

const debug = createDebug(
  "quefem-api:server:controllers:event:eventsController.js"
);

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await Event.find().limit(10).exec();
    res.status(200).json({ events });
  } catch (error) {
    error.message = "Database error connection";
    debug(error);
    next(error);
  }
};

export const deleteEvent = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { eventId } = req.params;

    const removedEvent = await Event.findByIdAndDelete(eventId).exec();

    if (!removedEvent) {
      const error = new CustomError(404, "Event not found");

      throw error;
    }

    res.status(200).json({ message: "Event removed" });
  } catch (error: unknown) {
    next(error);
  }
};

export const addEvent = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { userId, body } = req;

  try {
    const newEvent = await Event.create({
      ...body,
      user: new Types.ObjectId(userId),
    });

    if (!newEvent) {
      const error = new CustomError(404, "error creating event");
      throw error;
    }

    res.status(201).json({ event: newEvent });
  } catch (error: unknown) {
    next(error);
  }
};
