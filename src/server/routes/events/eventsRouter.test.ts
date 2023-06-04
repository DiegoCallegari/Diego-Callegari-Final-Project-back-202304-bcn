import "../../../loadEnvironment.js";
import request from "supertest";
import paths from "../../utils/paths.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import connectToDatabase from "../../../database/connectToDataBase.js";
import mongoose from "mongoose";
import Event from "../../../database/models/Event.js";
import { eventsMock } from "../../../mocks/eventsMocks.js";
import { app } from "../../app.js";

let server: MongoMemoryServer;
const tokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcwODRiMjJhYTE1NTc4MjFhYmIwY2UiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODU4OTU3ODgsImV4cCI6MTY4NTk4MjE4OH0.aGdLF2H_jl5vS7IG0jqga64R4SA59vJKhKqorFMhf68";

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await Event.deleteMany();
});

describe("Given a GET '/events' endpoint", () => {
  beforeEach(async () => {
    await Event.create(eventsMock);
  });

  describe("When it receives a request with a valid token", () => {
    test("Then it should return a status code 200 and a list of events", async () => {
      const expectedStatusCode = 200;

      const response = await request(app)
        .get(paths.events)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.events).toHaveLength(2);
    });
  });

  describe("When it receives a request with an invalid token", () => {
    test("Then it should return a status code 401 ", async () => {
      const expectedStatusCode = 401;

      await request(app).get(paths.events).expect(expectedStatusCode);
    });
  });
});
