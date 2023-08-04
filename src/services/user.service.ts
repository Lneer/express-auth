import UserEntities from "../db/usersdb";

class UserService {
  userSignUp = (login: string, password: string) => {
    const candidate = UserEntities.findOne({ key: "login", value: login });
    if (!candidate) {
      throw new Error("Bad Request");
    }
    return UserEntities.create({ login, password });
  };
}

export default new UserService();
