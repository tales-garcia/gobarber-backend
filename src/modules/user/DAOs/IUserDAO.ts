import mongoose from "@shared/infra/database"

export default interface IUserDAO {
  findByEmail(email: string): Promise<mongoose.Document>;
}
