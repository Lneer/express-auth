import { Schema } from "redis-om";
import { redisClient } from "../services/redis.service";
import { StoreService } from "../services/store.service";

export const userSchema = new Schema("user", {
  login: {
    type: "string",
  },
  password: {
    type: "string",
  },
});

export const userRepository = new StoreService(userSchema, redisClient);
