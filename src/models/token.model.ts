import { Schema } from "redis-om";
import { redisClient } from "../services/redis.service";
import { StoreService } from "../services/store.service";

export const tokenSchema = new Schema("token", {
  refreshToken: {
    type: "string",
  },
  userId: {
    type: "string",
  },
});

export const tokenRepository = new StoreService(tokenSchema, redisClient);
