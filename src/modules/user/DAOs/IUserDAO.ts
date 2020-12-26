import mongoose from "@shared/infra/database"
import { MongooseUpdateQuery } from "mongoose";

export default interface IUserDAO {
  findByEmail(email: string): Promise<mongoose.Document>;
  findByIdAndUpdate(id: string, query: MongooseUpdateQuery<any>): Promise<mongoose.Document>;
  create(user: object): Promise<mongoose.Document>;
  findById(id: string): Promise<mongoose.Document>;
  find(filter?: object): Promise<mongoose.Document[]>;
}
