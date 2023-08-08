import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import errorsMiddleware from "./middleware/errors.middleware";
import store from "./services/store.service";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser());
app.use(errorsMiddleware);

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>hello<h1>");
});

const start = async () => {
  await store.connect();
  app.listen(PORT, () => console.log(`server started on port ${PORT}`));
};

start();
