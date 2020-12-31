import IUserDAO from "@modules/user/DAOs/IUserDAO";
import IUserDtO from "@modules/user/DTOs/IUserDTO";
import User from "../entities/user"

interface IUser extends Assign<IUserDtO, "_id", string> {}

export default class UserDAO implements IUserDAO {
  async findByEmail(email: string) {
    return await User.findOne({ email }) as unknown as IUserDtO;
  }
  async findById(_id: string) {
    return await User.findById(_id) as unknown as IUserDtO;
  }
  async findByIdAndUpdate(_id: string, query: OptionalKeys<IUser>) {
    return await User.findByIdAndUpdate(_id, {
      $set: {
        query
      }
    }) as unknown as IUserDtO;
  }
  async find(filter?: OptionalKeys<IUser>) {
    const users = await User.find(filter) as unknown as IUserDtO[];

    users.forEach(user => user.password = undefined);

    return users;
  }
  async create(user: IUserDtO) {
    const createdUser = await User.create(user) as unknown as IUserDtO;

    createdUser.password = undefined;

    return createdUser;
  }
}
