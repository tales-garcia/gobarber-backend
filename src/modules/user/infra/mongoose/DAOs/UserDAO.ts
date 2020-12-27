import IUserDAO from "@modules/user/DAOs/IUserDAO";
import IUserDtO from "@modules/user/DTOs/IUserDTO";
import { MongooseUpdateQuery } from "mongoose";
import User from "../entities/user"

export default class UserDAO implements IUserDAO {
  async findByEmail(email: string) {
    return await User.findOne({ email }) as unknown as IUserDtO;
  }
  async findById(id: string) {
    return await User.findById(id) as unknown as IUserDtO;
  }
  async findByIdAndUpdate(id: string, query: MongooseUpdateQuery<IUserDtO>) {
    return await User.findByIdAndUpdate(id, query) as unknown as IUserDtO;
  }
  async find(filter?: object) {
    const users = await User.find(filter) as unknown as IUserDtO[];

    users.forEach(user => user.password = undefined);

    return users;
  }
  async create(user: object) {
    const createdUser = await User.create(user) as unknown as IUserDtO;

    createdUser.password = undefined;

    return createdUser;
  }
}
