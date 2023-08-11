import { EntityId } from "redis-om";
import UserDto from "../dto/user.dto";
import APiError from "./errors.service";
import { tokenService } from "./token.service";
import { passwordService } from "./password.service";
import { userRepository } from "../models/users.model";
import { tokenRepository } from "../models/token.model";
import { User } from "../types/types";

class UserService {
  async signUp(login: string, password: string) {
    const candidate = await userRepository.findOne({
      key: "login",
      value: login,
    });

    if (candidate) {
      throw APiError.Badrequest(`user with login ${login} already exist`);
    }

    const hashedPassword = await passwordService.hash(password);

    const createdUser = await userRepository.save({
      login,
      password: hashedPassword,
    });
    const userId = createdUser[EntityId];
    const userDto = new UserDto(createdUser as User);
    const tokens = tokenService.generate({
      ...userDto,
    });

    await tokenService.save(userId as string, tokens.refreshToken);

    return { ...tokens, user: { ...userDto, _id: userId } };
  }

  signIn = async (login: string, password: string) => {
    const candidate = (await userRepository.findOne({
      key: "login",
      value: login,
    })) as User | null;

    if (!candidate) {
      throw APiError.Badrequest(`user with login ${login} doesn't exist`);
    }
    const isCorrectPassword = await passwordService.compare(
      password,
      candidate.password
    );

    if (!isCorrectPassword) {
      throw APiError.Badrequest(`incorrect password`);
    }

    const userId = candidate[EntityId] as string;

    const userDto = new UserDto(candidate);

    const tokens = tokenService.generate({
      ...userDto,
    });
    await tokenService.save(userId, tokens.refreshToken);

    return { ...tokens, user: { ...userDto, _id: userId } };
  };

  signOut = async (refreshToken: string) => {
    if (!refreshToken) {
      throw APiError.UnAutorized(`please signIn first`);
    }
    tokenService.remove(refreshToken);
  };

  refresh = async (refreshToken: string) => {
    if (!refreshToken) {
      throw APiError.UnAutorized(`please signIn first`);
    }
    const isValidToken = tokenService.validateToken(
      "refreshToken",
      refreshToken
    );

    const tokenFromDB = await tokenRepository.findOne({
      key: "refreshToken",
      value: refreshToken,
    });

    if (!isValidToken || !tokenFromDB) {
      throw APiError.UnAutorized(`please signIn first`);
    }
    const candidate = (await userRepository.fetch(
      tokenFromDB.userId as string
    )) as User;
    if (!candidate) {
      throw APiError.UnAutorized(`please signIn first`);
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

export const userService = new UserService();
