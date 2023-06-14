import { type Request, type NextFunction, type Response } from "express";
import { eventsMock } from "../../../../mocks/eventsMocks.js";
import { type CustomRequest } from "../../../types.js";
import Event from "../../../../database/models/Event.js";
import { getEvents } from "../eventsController.js";

beforeEach(() => {
  jest.clearAllMocks();
});

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
      sort: jest.fn().mockReturnThis(),
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

  describe("When it receives a next function and the exec method rejects with a 'Database error connection'", () => {
    test("Then it should call next function with the error 'Database error connection'", async () => {
      const expectedError = new Error("Database error connection");

      Event.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getEvents(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
