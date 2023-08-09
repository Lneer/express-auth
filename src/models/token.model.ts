import { Schema, Repository, EntityData } from "redis-om";
import redisClient from "../services/redis.service";
import StoreService from "../services/store.service";

export const tokenSchema = new Schema("token", {
  refreshToken: {
    type: "string",
  },
  userId: {
    type: "string",
  },
});

// interface tokenEntityData extends EntityData {
//   refreshToken: string;
//   userId: string;
// }

// const tokenModel = new Repository(tokenSchema, redisClient);
export const tokenRepository = new StoreService(tokenSchema, redisClient);
tokenRepository.createIndex();

export default tokenRepository;

// export interface Token {
//   _id: string;
//   userId: string;
//   accessToken: string;
//   refreshToken: string;
// }
