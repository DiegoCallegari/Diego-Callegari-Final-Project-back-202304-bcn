import { type Response, type NextFunction } from "express";
import { newEventMock } from "../../../../mocks/eventsMocks.js";
import { type CustomRequest } from "../../../types";
import { addEvent } from "../eventsController.js";
import Event from "../../../../database/models/Event.js";
import { CustomError } from "../../../../CustomError/CustomError.js";

describe("Given an addEvent controller", () => {
  const next = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req: Partial<CustomRequest> = {
    userId: "647084b22aa1557821abb0ce",
    body: newEventMock,
  };

  describe("When it receives a request with a valid event on the body, a response and a next function", () => {
    test("Then it should call the status response method with status code 201 and a json response with the event created", async () => {
      const expectedStatus = 201;

      Event.create = jest.fn().mockResolvedValue(newEventMock);

      await addEvent(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith({ event: newEventMock });
    });
  });

  describe("When it receives a request with a user id and a new event but the process fails", () => {
    test("Then it should call the received next function with a custom error 400 with the message 'Event not created'", async () => {
      const expectedStatus = 400;
      const expectedMessage = "error creating event";

      const expectedCustomError = new CustomError(
        expectedStatus,
        expectedMessage
      );

      Event.create = jest.fn().mockResolvedValue(undefined);

      await addEvent(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
