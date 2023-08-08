import express from "express";
import authController from "../controllers/authController";
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
          options: { min: 3 },
          errorMessage: "Password should be at least 8 chars",
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
