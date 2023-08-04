import UserEntities from "../db/usersdb";
import APiError from "./errors.service";

class UserService {
  signUp = (login: string, password: string) => {
    const candidate = UserEntities.findOne({ key: "login", value: login });
    if (candidate) {
      throw APiError.Badrequest(`user with login ${login} already exist`);
    }
    return UserEntities.create({ login, password });
  };
}

export default new UserService();
