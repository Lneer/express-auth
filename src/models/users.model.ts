import { Entity, Schema, Repository } from "redis-om";
import redisClient from "../services/redis.service";
import StoreService from "../services/store.service";

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

export const userRepository = new StoreService(userSchema, redisClient);

userRepository.createIndex();

// export interface User {
//   _id: string;
//   login: string;
//   password: string;
// }
