import APiError from "../services/errors.service";
import { userService } from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "../types/types";

interface SignUpBody {
  login: string;
  password: string;
}

class AuthController {
  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body as SignUpBody;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw APiError.badRequest(
          "format data error",
          errors.formatWith((err) => err.msg).array()
        );
      }
      const userData = await userService.signUp(login, password);
      res.cookie("refreshToken", userData.refreshToken, { httpOnly: true });
      return res.status(StatusCodes.CREATED).json(userData);
    } catch (error) {
      next(error);
    }

    res.end();
  };

  signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = req.body as SignUpBody;
      const userData = await userService.signIn(login, password);
      res.cookie("refreshToken", userData.refreshToken, { httpOnly: true });
      return res.json({
        user: { ...userData.user },
        accessToken: userData.accessToken,
      });
    } catch (error) {
      next(error);
    }
  };

  signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      await userService.signOut(refreshToken);
      res.clearCookie("refreshToken").status(StatusCodes.DELETED);
      return res.end();
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, { httpOnly: true });
      return res.json({ accessToken: userData.accessToken });
    } catch (error) {
      next(error);
    }
  };

  check = async (req: Request, res: Response) => {};
}

export default new AuthController();
