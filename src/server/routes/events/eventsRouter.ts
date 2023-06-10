import { Router } from "express";
import {
  addEvent,
  deleteEvent,
  getEvents,
} from "../../controllers/event/eventsController.js";
import { validate } from "express-validation";
import { createEventSchema } from "../../utils/schemas/eventSchema.js";

const eventsRouter = Router();

eventsRouter.get("/", getEvents);
eventsRouter.delete("/:eventId", deleteEvent);
eventsRouter.post(
  "/add",
  validate(createEventSchema, {}, { abortEarly: false }),
  addEvent
);

export default eventsRouter;
