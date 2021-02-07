import IUserDAO from "@modules/user/DAOs/IUserDAO";
import IFindDTO from "@modules/user/DTOs/IFindDTO";
import IUserDtO from "@modules/user/DTOs/IUserDTO";
import User from "../schemas/user"
import uploadConfig from '@config/upload';

interface IUser extends Assign<IUserDtO, "_id", string> {}

export default class UserDAO implements IUserDAO {
  async findByEmail(email: string) {
    const user = await User.findOne({ email }) as unknown as IUser;

    if (!user) return null;

    return this.getUserAvatarURL(user);
  }
  async findById(_id: string) {
    const user = await User.findById(_id) as unknown as IUser;

    if (!user) return null;

    return this.getUserAvatarURL(user);
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
      return (await User.find({
        ...data?.filter,
        _id: {
          $ne: data.excludeId
        }
      }) as unknown as IUser[]).map(this.getUserAvatarURL);
    }

    const users = await User.find(data?.filter) as unknown as IUser[];

    users.forEach(user => user.password = undefined);

    return users.map(this.getUserAvatarURL);
  }
  async create(user: IUserDtO) {
    const createdUser = await User.create(user as IUser) as unknown as IUser;

    createdUser.password = undefined;

    return createdUser;
  }
  getUserAvatarURL(user: IUser) {
    if (!user.avatar) return user;

    let avatarUrl: string;

    switch (uploadConfig.driver) {
      case 'disk': {
        avatarUrl = `${process.env.BACKEND_URL}/images/${user.avatar}`;
        break;
      }
      case 's3': {
        avatarUrl = `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${user.avatar}`;
        break;
      }
    }

    const realUser = {};

    Object.assign(realUser, {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      password: user.password,
      avatarUrl,
      createdAt: (user as any).createdAt,
      updatedAt: (user as any).updatedAt
    });

    return realUser as IUser;
  }
}
