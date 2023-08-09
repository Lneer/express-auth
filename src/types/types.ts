import { Entity } from "redis-om";

export type TokenType = "accessToken" | "refreshToken";
export type Tokens = Record<TokenType, string>;

export interface User extends Entity {
  login: string;
  password: string;
}
