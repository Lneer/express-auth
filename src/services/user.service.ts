import bcrypt from "bcrypt";
import store from "./store.service";
import APiError from "./errors.service";
import tokenService from "./token.service";
import { EntityId } from "redis-om";
import UserDto from "../dto/user.dto";
import { User } from "../models/users.model";

class UserService {
  signUp = async (login: string, password: string) => {
    const candidate = await store.findOne(store.userRepository, {
      key: "login",
      value: login,
    });
    if (candidate) {
      throw APiError.Badrequest(`user with login ${login} already exist`);
    }
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT) || 2
    );
    const createdUser = await store.create(store.userRepository, {
      login,
      password: hashedPassword,
    });

    const userId = createdUser[EntityId];

    const userDto = new UserDto(createdUser as User);

    const { accessToken, refreshToken } = tokenService.generate({
      ...userDto,
    });

    await tokenService.save(userId as string, refreshToken);

    return { accessToken, refreshToken, user: userDto };
  };

  signIn = async (login: string, password: string) => {
    const candidate = (await store.findOne(store.userRepository, {
      key: "login",
      value: login,
    })) as User | null;

    if (!candidate) {
      throw APiError.Badrequest(`user with login ${login} doesn't exist`);
    }
    const isCorrectPassword = await bcrypt.compare(
      password,
      candidate.password
    );

    if (!isCorrectPassword) {
      throw APiError.Badrequest(`incorrect password`);
    }

    const userId = candidate[EntityId];
    const userDto = new UserDto(candidate);
    const { accessToken, refreshToken } = tokenService.generate({
      ...userDto,
    });

    await tokenService.save(userId as string, refreshToken);

    return { accessToken, refreshToken, user: userDto };
  };

  signOut = async (refreshToken: string) => {
    if (!refreshToken) {
      throw APiError.Badrequest(`please signIn first`);
    }
    store.remove(store.tokenRepository, refreshToken);
  };

  refresh = async (refreshToken: string) => {
    if (!refreshToken) {
      throw APiError.Badrequest(`please signIn first`);
    }
    const isValidToken = tokenService.validateToken(
      "refreshToken",
      refreshToken
    );
    const tokenFromDB = await store.findOne(store.tokenRepository, {
      key: "refreshToken",
      value: refreshToken,
    });
    if (!isValidToken || !tokenFromDB) {
      throw APiError.Badrequest(`please signIn first`);
    }
    const candidate = (await store.findOne(store.userRepository, {
      key: "EntityId",
      value: tokenFromDB.userId,
    })) as User;
    if (!candidate) {
      throw APiError.Badrequest(`please signIn first`);
    }
    const userDto = new UserDto(candidate);
    const tokens = tokenService.generate({
      ...userDto,
    });
    const userId = candidate[EntityId];
    await tokenService.save(userId as string, tokens.refreshToken);
    return { ...tokens, user: userDto };
  };
}

export default new UserService();
