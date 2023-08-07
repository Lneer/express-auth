// import { User } from "../models/users.model";
// import DBEntity from "./store";

// type CreateUserDTO = Omit<User, "_id">;

// class UserEntities extends DBEntity<User, CreateUserDTO> {
//   create(userDTO: CreateUserDTO): User {
//     const createdUser = {
//       _id: String(Date.now()),
//       ...userDTO,
//     };
//     this.entities.push(createdUser);
//     return createdUser;
//   }
// }

// export default new UserEntities();
