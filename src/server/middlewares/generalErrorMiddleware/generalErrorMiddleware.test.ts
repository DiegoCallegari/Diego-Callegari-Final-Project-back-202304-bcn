import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import generalError from "./generalErrorMiddleware.js";

beforeEach(() => {
  jest.clearAllMocks();
});

type CustomResponse = Pick<Response, "status" | "json">;

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req = {};
const next = jest.fn();

describe("Given a generalErrorMiddleware middleware", () => {
  describe("When it is called and receives an unknow error", () => {
    test("Then it should the response with a status code 500 and the message 'General error' ", () => {
      const error = new Error("General error");
      const statusCode = 500;
      const { message } = error;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ message });
    });

    describe("When it's called with status code 404 and an 'Endpoint not found' message", () => {
      test("then it should call the response with status code 404 and an 'Endpoint not found' message", () => {
        const error = new CustomError(404, "Endpoint not found");
        const expectedStatusCode = 404;
        const { message } = error;

        generalError(
          error,
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(res.json).toHaveBeenCalledWith({ message });
      });
    });
  });
});
