import { Router } from "express";
import getEvents, {
  deleteEvent,
} from "../../controllers/event/eventsController.js";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";

const eventsRouter = Router();

eventsRouter.get("/", getEvents);

eventsRouter.delete("/:eventId", auth, deleteEvent);

export default eventsRouter;
