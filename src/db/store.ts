import { User } from "../models/users.model";

class UserStore {
  store: User[];
  constructor() {
    this.store = [];
  }
  findAll = () => {
    return this.store;
  };

  findById = (id: string) => {
    return this.store.find((user) => user._id === id);
  };

  addUser = (user: User) => {
    this.store.push(user);
  };

  deleteUserById = (id: string) => {
    const UserIndex = this.store.findIndex((user) => user._id === id);
    this.store.splice(UserIndex, 1);
    return this.store;
  };
}

export default new UserStore();
