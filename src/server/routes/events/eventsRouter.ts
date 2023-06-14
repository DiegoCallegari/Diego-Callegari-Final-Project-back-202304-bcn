import { Router } from "express";
import {
  addEvent,
  deleteEvent,
  getEvents,
} from "../../controllers/event/eventsController.js";
import { validate } from "express-validation";
import { createEventSchema } from "../../utils/schemas/eventSchema.js";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";

const eventsRouter = Router();

eventsRouter.get("/", getEvents);
eventsRouter.delete("/:eventId", auth, deleteEvent);
eventsRouter.post(
  "/add",
  auth,
  validate(createEventSchema, {}, { abortEarly: false }),
  addEvent
);

export default eventsRouter;
