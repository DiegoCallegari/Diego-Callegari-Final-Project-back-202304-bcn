import { Router } from "express";
import {
  deleteEvent,
  getEvents,
} from "../../controllers/event/eventsController.js";

const eventsRouter = Router();

eventsRouter.get("/", getEvents);

eventsRouter.delete("/:eventId", deleteEvent);

export default eventsRouter;
