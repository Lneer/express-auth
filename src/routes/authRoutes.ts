import express from "express";
import authController from "../controllers/authController";
import { body, checkSchema } from "express-validator";
const authRouter = express.Router();

authRouter.post(
  "/signup",
  checkSchema(
    {
      login: {
        isLength: {
          options: { min: 3 },
          errorMessage: "Login should be at least 3 chars",
        },
      },
      password: {
        isLength: {
          options: { min: 3 },
          errorMessage: "Password should be at least 3 chars",
        },
      },
    },
    ["body"]
  ),
  authController.signUp
);
authRouter.post("/signin", authController.signIn);
authRouter.post("/signout", authController.signOut);
authRouter.get("/refresh", authController.refresh);

export default authRouter;
