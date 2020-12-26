import IUserDAO from "@modules/user/DAOs/IUserDAO";
import User from "../entities/user"

export default class UserDAO extends User implements IUserDAO {
  async findByEmail(email: string) {
    return await User.findOne({ email });
  }
}
