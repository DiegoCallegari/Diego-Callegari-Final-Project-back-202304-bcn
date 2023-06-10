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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDcwODRiMjJhYTE1NTc4MjFhYmIwY2UiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2ODYzOTE5ODQsImV4cCI6MTY4NjQ3ODM4NH0.DeEC357UHw1VF8srOwrBKT-EwBs6QQBSCvYhNoJgx-Y";

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

beforeEach(() => {
  jest.clearAllMocks();
});

beforeEach(async () => {
  await Event.create(eventsMock);
});

describe("Given a GET '/events' endpoint", () => {
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
});

describe("Given a DELETE '/:id' endpoint", () => {
  describe("When it receives a request with a valid id", () => {
    test("Then it should return a status with status code '200' and the response's method json with 'Event removed' message", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "Event removed";

      const event = await Event.find().exec();

      const response = await request(app)
        .delete(`/events/${event[0]._id.toString()}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a POST '/add' endpoint", () => {
  describe("When it recieve a request with an event and a new event data named 'Beach Concert'", () => {
    test("Then it should return a statusCode 201 and the new event with name 'Beach Concert'", async () => {
      const expectedStatusCode = 201;
      const expectedProperty = "event";

      const response = await request(app)
        .post("/events/add")
        .set("Authorization", `Bearer ${tokenMock}`)
        .send({
          title: "Beach",
          image: "image",
          neighbourhood: "Barceloneta",
          description: "good vibes",
          date: "2023, 6, 15",
          category: "music",
        })
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty(expectedProperty);
    });
  });
});
