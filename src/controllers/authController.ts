import usersdb from "../db/usersdb";
import APiError from "../services/errors.service";
import UserService from "../services/user.service";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

interface SignUpBody {
  login: string;
  password: string;
}

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { login, password } = req.body as SignUpBody;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw APiError.Badrequest(
        errors.array().reduce((acc, item) => acc + item.msg + ", ", "")
      );
    }
    const userData = UserService.signUp(login, password);
    return res.json(userData);
  } catch (error) {
    next(error);
  }

  res.end();
};

export const signIn = async (req: Request, res: Response) => {
  // const { login, password } = req.body as SignInBody;
  // res.redirect("/");
  // res.end();
};

export const check = async (req: Request, res: Response) => {
  res.send(usersdb.findAll());
};
