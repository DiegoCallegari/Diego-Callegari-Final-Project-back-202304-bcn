import { type NextFunction, type Request, type Response } from "express";
import notFoundError from "./notFoundMiddleware.js";
import { CustomError } from "../../../CustomError/CustomError.js";

describe("Given a notFoundErrorMiddleware middleware", () => {
  describe("When it is called", () => {
    test("Then it should call the next function with a status code 404 and the message 'Error not found' ", () => {
      const customError = new CustomError(404, "Endpoint not found");

      type CustomResponse = Pick<Response, "status" | "json">;

      const res: CustomResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const req = {};
      const next = jest.fn();

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
