import usersdb from "../db/usersdb";
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
      errors.throw();
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
