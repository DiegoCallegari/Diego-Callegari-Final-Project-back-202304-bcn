import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { type NextFunction, type Response } from "express";
import loginUser from "./userController.js";
import { type UserStructure, type UserAccessRequest } from "../../types";
import User from "../../../database/models/user.js";
import { type UserAccess } from "../../types";
import { CustomError } from "../../../CustomError/CustomError.js";

describe("Given a login userController", () => {
  const mockToken = "returntoken";

  const userCredentials: UserAccess = {
    username: "admin",
    password: "admin",
  };

  const mockedUser: UserStructure = {
    _id: new Types.ObjectId().toString(),
    username: "admin",
    password: "admin",
  };

  const req: Partial<UserAccessRequest> = {
    body: userCredentials,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a valid username and password in the request", () => {
    test("Then it should send a response with status code 200", async () => {
      const expectedStatus = 200;

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockReturnValue(mockedUser),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jwt.sign = jest.fn().mockReturnValue(mockToken);

      await loginUser(req as UserAccessRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should send a response method json with the respective token", async () => {
      await loginUser(req as UserAccessRequest, res as Response, next);

      expect(res.json).toHaveBeenCalledWith({ token: mockToken });
    });

    describe("When it receives a request with wrong credentials", () => {
      test("then it should call the received next function with a 401 status code and a 'Wrong credentials' message", async () => {
        const error = new CustomError(401, "Wrong credentials access");

        User.findOne = jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(undefined),
        });

        bcrypt.compare = jest.fn().mockResolvedValue(false);

        await loginUser(
          req as UserAccessRequest,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
