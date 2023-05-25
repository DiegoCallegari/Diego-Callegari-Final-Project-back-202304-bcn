import { type Request, type Response } from "express";
import pingController from "./pingController.js";

type CustomResponse = Pick<Response, "status" | "json">;

describe("Given a pingController", () => {
  describe("When it is called with a request", () => {
    test("Then it should respond with a status code 200 and the message 'pong🏓' ", () => {
      const expectedStatusCode = 200;
      const expectedMessage = "pong 🏓";
      const req = {};
      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenLastCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });
});
