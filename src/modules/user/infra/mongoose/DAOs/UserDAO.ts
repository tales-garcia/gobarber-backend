import mongoose, { MongooseUpdateQuery } from "mongoose";
import User from "../entities/user"

export default {
  async findOne(filter: object) {
    return await User.findOne(filter);
  },
  async create(user: object) {
    return await User.create(user);
  },
  async find(filter?: object) {
    return await User.find(filter);
  },
  async findByIdAndUpdate(id: string, updateQuery: MongooseUpdateQuery<any>) {
    return await User.findByIdAndUpdate(id, updateQuery);
  },
  async findById(id: string) {
    return await User.findById(id);
  }
}
