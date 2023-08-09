import { redisClient } from "./services/redis.service";
import { start } from "./services/server.service";

start();

process.on("SIGINT", async () => {
  await redisClient.disconnect();
  process.exit();
});
