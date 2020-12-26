import IUserDAO from "@modules/user/DAOs/IUserDAO";
import { MongooseUpdateQuery } from "mongoose";
import User from "../entities/user"

export default class UserDAO implements IUserDAO {
  async findByEmail(email: string) {
    return await User.findOne({ email });
  }
  async findById(id: string) {
    return await User.findById(id);
  }
  async findByIdAndUpdate(id: string, query: MongooseUpdateQuery<any>) {
    return await User.findByIdAndUpdate(id, query);
  }
  async find(filter?: object) {
    const users = await User.find(filter) as any[];

    users.forEach(user => user.password = undefined);

    return users;
  }
  async create(user: object) {
    const createdUser = await User.create(user) as any;

    createdUser.password = undefined;

    return createdUser;
  }
}
