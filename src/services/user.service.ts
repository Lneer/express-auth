import UserEntities from "../db/usersdb";
import APiError from "./errors.service";
import dbService from "./redis.service";

class UserService {
  signUp = async (login: string, password: string) => {
    const candidate = UserEntities.findOne({ key: "login", value: login });
    if (candidate) {
      throw APiError.Badrequest(`user with login ${login} already exist`);
    }
    await dbService.addItem(login, password);
    return UserEntities.create({ login, password });
  };
}

export default new UserService();
