import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import errorsMiddleware from "../middleware/errors.middleware";
import authRouter from "../routes/authRoutes";
import { redisClient } from "./redis.service";
import { userRepository } from "../models/users.model";
import { tokenRepository } from "../models/token.model";
import swaggerDocument from "../../swagger.json";
import "dotenv/config";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorsMiddleware);

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>hello<h1>");
});

export const start = async () => {
  await redisClient.connect();
  await userRepository.createIndex();
  await tokenRepository.createIndex();
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};
