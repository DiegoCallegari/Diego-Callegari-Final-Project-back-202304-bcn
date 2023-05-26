import "../../../loadEnvironment.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import mongoose from "mongoose";
import { type UserAccess, type UserDbStructure } from "../../types";
import jwt from "jsonwebtoken";
import { app } from "../../app.js";
import User from "../../../database/models/user.js";
import connectToDatabase from "../../../database/connectToDataBase.js";
import paths from "../../utils/paths.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

const mockUser: UserAccess = {
  username: "didi",
  password: "didi1010",
};

const mockInvalidUser: UserAccess = {
  username: "didi",
  password: "didi1011",
};

const mockUserHashed: UserAccess = {
  username: "didi",
  password: "$2y$10$rxjBX/5k2ZZMiHXNMPkM1OIb9tWksHFXpXSi3H4Yw1MQayR0TojJm",
};

describe("Given a endpoint with a method POST and a path '/user/login' ", () => {
  describe("When it receives a request with a valid user", () => {
    let newUser: UserDbStructure;

    beforeAll(async () => {
      newUser = await User.create(mockUserHashed);
    });

    test("Then it should respond with a status code 200 and a token", async () => {
      const expectedStatus = 200;

      const response: { body: { token: string } } = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockUser)
        .expect(expectedStatus);

      const payload = jwt.verify(response.body.token, process.env.JWT_SECRET!);

      const userId = payload.sub as string;

      expect(userId).toBe(newUser._id.toString());
    });
  });

  describe("When it receives a request with a invalid password", () => {
    test("Then it should respond with a status code 401 and a 'Wrong credentials access' message", async () => {
      const expectedStatus = 401;

      const extectedMessage = "Wrong credentials access";

      const res: { body: { message: string } } = await request(app)
        .post(`${paths.user}${paths.login}`)
        .send(mockInvalidUser)
        .expect(expectedStatus);

      expect(res.body.message).toBe(extectedMessage);
    });
  });
});
