import { Schema, Types, model } from "mongoose";
import User from "./User.js";

const eventSchema = new Schema({
  title: {
    type: String,
    required: String,
  },

  image: {
    type: String,
    required: String,
  },

  barrio: {
    type: String,
    required: String,
  },

  description: {
    type: String,
  },

  date: Date,

  category: String,

  user: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Event = model("Event", eventSchema, "events");

export default Event;
