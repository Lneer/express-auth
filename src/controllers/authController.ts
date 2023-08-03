import store from "../db/store";
import { Request, Response } from "express";
import { User } from "../models/users.model";

interface SignInBody {
  login: string;
  password: string;
}

interface SignInUpBody {
  login: string;
  password: string;
}

export const signIn = async (req: Request, res: Response) => {
  const { login, password } = req.body as SignInBody;
  res.redirect("/");
  res.end();
};

export const signUp = async (req: Request, res: Response) => {
  const { login, password } = req.body as SignInUpBody;
  const newUser: User = {
    _id: String(Date.now()),
    login,
    password,
  };
  store.addUser(newUser);
  res.end();
  console.log(login, password);
};

export const check = async (req: Request, res: Response) => {
  res.send(store);
};
