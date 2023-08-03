import express from "express";
import { check, signIn, signUp } from "../controllers/authController";
import { body } from "express-validator";
const authRouter = express.Router();

authRouter.post(
  "/signup",
  body("login").isEmail(),
  body("password").isLength({ min: 3, max: 12 }),
  signUp
);
authRouter.post("/signin", signIn);
authRouter.get("/", check);

export default authRouter;
