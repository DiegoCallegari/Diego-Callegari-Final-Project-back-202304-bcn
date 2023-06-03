import { type NextFunction, type Response } from "express";
import getEvents from "./eventsController.js";
import { eventsMock } from "../../../mocks/eventsMocks.js";
import { type CustomRequest } from "../../types.js";
import Event from "../../../database/models/Event.js";

describe("Given an events controller", () => {
  const req = {};
  const next = jest.fn();
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a response", () => {
    Event.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(eventsMock),
    });

    test("Then it should call the method status 200", async () => {
      const expectedStatus = 200;

      await getEvents(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });
});
