import { type Request } from "express";

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
