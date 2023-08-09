import { createClient } from "redis";
// type ClientType = ReturnType<typeof createClient>;

const redisClient = createClient();

export default redisClient;
