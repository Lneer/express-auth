import express from "express";
import { check, signIn, signUp } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
authRouter.get("/", check);

export default authRouter;
