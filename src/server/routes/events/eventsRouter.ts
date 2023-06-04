import { Router } from "express";
import getEvents from "../../controllers/event/eventsController.js";

const eventsRouter = Router();

eventsRouter.get("/", getEvents);

export default eventsRouter;
