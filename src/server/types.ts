import { type Request } from "express";
import { type Types } from "mongoose";

export interface UserAccess {
  username: string;
  password: string;
}

export type UserAccessRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserAccess
>;

export type UserStructure = {
  _id: string;
} & UserAccess;

export interface UserDbStructure extends UserAccess {
  _id: Types.ObjectId;
}
