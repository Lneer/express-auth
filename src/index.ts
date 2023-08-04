import express, { Request, Response } from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import errorsMiddleware from "./middleware/errors.middleware";

const PORT = 5000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(errorsMiddleware);

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>hello<h1>");
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
