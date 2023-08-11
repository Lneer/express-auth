import { Entity } from "redis-om";

export type TokenType = "accessToken" | "refreshToken";
export type Tokens = Record<TokenType, string>;

export interface User extends Entity {
  login: string;
  password: string;
}

export enum StatusCodes {
  "SUCCSESS" = 200,
  "CREATED" = 201,
  "DELETED" = 204,
  "BAD REQUEST" = 400,
  "AUTORIZATION ERROR" = 401,
}
