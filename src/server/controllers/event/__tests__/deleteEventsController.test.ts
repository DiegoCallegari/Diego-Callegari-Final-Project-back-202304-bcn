import { type NextFunction, type Response } from "express";
import { eventsMock } from "../../../../mocks/eventsMocks";
import { type CustomRequest } from "../../../types";
import Event from "../../../../database/models/Event";
import { deleteEvent } from "../eventsController";
import { CustomError } from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given an deleteEvents controller", () => {
  const next = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request with a valid event id", () => {
    test("Then it should call the response method status with code 200", async () => {
      const expectedStatus = 200;

      const req: Partial<CustomRequest> = {
        params: {
          eventId: eventsMock[0]._id.toString(),
        },
      };

      Event.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(eventsMock[0]),
      });

      await deleteEvent(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });
  });

  describe("When it receives a request with an invalid event id", () => {
    test("Then it should call the next function with the message 'Event not found'", async () => {
      const req: Partial<CustomRequest> = {
        params: { eventId: "8" },
      };

      const error = new CustomError(404, "Event not found");

      Event.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await deleteEvent(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
