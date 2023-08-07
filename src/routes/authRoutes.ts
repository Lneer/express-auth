import express from "express";
import { check, signIn, signUp } from "../controllers/authController";
import { body, checkSchema } from "express-validator";
const authRouter = express.Router();

authRouter.post(
  "/signup",
  checkSchema(
    {
      login: {
        errorMessage: "Invalid login",
        isEmail: true,
      },
      password: {
        isLength: {
          options: { min: 8 },
          errorMessage: "Password should be at least 8 chars",
        },
      },
    },
    ["body"]
  ),
  signUp
);
authRouter.post("/signin", signIn);
authRouter.get("/", check);

export default authRouter;
