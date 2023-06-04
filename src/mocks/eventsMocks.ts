import { Types } from "mongoose";
import { type EventStructure } from "../server/types";

export const eventMock: EventStructure = {
  _id: new Types.ObjectId(),
  title: "Beach Concert",
  image: "",
  neighbourhood: "Marbella Beach",
  description: "",
  date: new Date(2023, 6, 15),
  category: "music",
  user: new Types.ObjectId("647084b22aa1557821abb0ce"),
};

export const eventsMock: EventStructure[] = [
  {
    _id: new Types.ObjectId(),
    title: "Beach Concert",
    image: "",
    neighbourhood: "Marbella Beach",
    description: "",
    date: new Date(2023, 6, 15),
    category: "apreciate",
    user: new Types.ObjectId("647084b22aa1557821abb0ce"),
  },
  {
    _id: new Types.ObjectId(),
    title: "Bunkers Sunset",
    image: "",
    neighbourhood: "El Carmel",
    description: "",
    date: new Date(2023, 6, 15),
    category: "nature",
    user: new Types.ObjectId("647084b22aa1557821abb0ce"),
  },
];
