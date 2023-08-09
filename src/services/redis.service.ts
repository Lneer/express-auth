import { createClient } from "redis";

export const redisClient = createClient();

redisClient.on("error", (err) => console.error(err));
redisClient.on("connect", () => console.log("connected with db"));
