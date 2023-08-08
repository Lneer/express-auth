import { User } from "../models/users.model";

class UserDto {
  login: string;

  constructor(model: User) {
    this.login = model.login;
  }
}

export default UserDto;
