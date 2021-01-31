import IUserDAO from "@modules/user/DAOs/IUserDAO";
import IFindDTO from "@modules/user/DTOs/IFindDTO";
import IUserDtO from "@modules/user/DTOs/IUserDTO";
import User from "../entities/user"

interface IUser extends Assign<IUserDtO, "_id", string> {}

export default class UserDAO implements IUserDAO {
  async findByEmail(email: string) {
    return await User.findOne({ email }) as unknown as IUser;
  }
  async findById(_id: string) {
    return await User.findById(_id) as unknown as IUser;
  }
  async findByIdAndUpdate(_id: string, query: OptionalKeys<IUser>) {
    return await User.findByIdAndUpdate(_id, {
      $set: {
        ...query
      }
    }) as unknown as IUser;
  }
  async find(data?: IFindDTO) {
    if(data && data.excludeId) {
      return await User.find({
        ...data?.filter,
        _id: {
          $ne: data.excludeId
        }
      }) as unknown as IUser[];
    }

    const users = await User.find(data?.filter) as unknown as IUser[];

    users.forEach(user => user.password = undefined);

    return users;
  }
  async create(user: IUserDtO) {
    const createdUser = await User.create(user as IUser) as unknown as IUserDtO;

    createdUser.password = undefined;

    return createdUser;
  }
}
