import store from "./store.service";
import APiError from "./errors.service";
import tokenService from "./token.service";
import { EntityId } from "redis-om";

class UserService {
  signUp = async (login: string, password: string) => {
    const candidate = await store.findOne(store.userRepository, {
      key: "login",
      value: login,
    });
    console.log("candidate", candidate);
    if (candidate) {
      throw APiError.Badrequest(`user with login ${login} already exist`);
    }

    const createdUser = await store.create(store.userRepository, {
      login,
      password,
    });
    console.log("createdUser", createdUser);

    const userId = createdUser[EntityId];
    console.log("userId", userId);
    const { accessToken, refreshToken } = tokenService.generateToken({
      login,
      userId,
    });
    await store.create(store.tokenRepository, {
      userId,
      refreshToken,
    });
  };
}

export default new UserService();
