import { Entity, Schema } from "redis-om";

export const userSchema = new Schema("user", {
  login: {
    type: "string",
  },
  password: {
    type: "string",
  },
});

export interface User extends Entity {
  login: string;
  password: string;
}

// export interface User {
//   _id: string;
//   login: string;
//   password: string;
// }
