import { User } from "../types/types";

class UserDto {
  login: string;

  constructor(model: User) {
    this.login = model.login;
  }
}

export default UserDto;
