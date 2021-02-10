import IUserDAO from "@modules/user/DAOs/IUserDAO";
import IFindDTO from "@modules/user/DTOs/IFindDTO";
import IUserDtO from "@modules/user/DTOs/IUserDTO";
import { v4 } from "uuid";
import uploadConfig from '@config/upload';

interface IUser extends Assign<IUserDtO, "_id", string> {}

export default class UserDAOMock implements IUserDAO {
  private users: IUser[] = [];

  async findOne(filter: OptionalKeys<IUser>) {
    return (await this.find()).find(user => {
      const results = Object.keys(filter).map(key => user[key] === filter[key]);

      return !results.some(result => !result);
    });
  }
  async findByEmail(email: string) {
    return await this.findOne({ email });
  }
  async findById(_id: string) {
    return await this.findOne({ _id });
  }
  async findByIdAndUpdate(_id: string, query: OptionalKeys<IUser>) {
    const updatedUser = await this.findById(_id);

    const keys = Object.keys(query);

    keys.forEach(key => {
      updatedUser[key] = query[key];
    })

    this.users[this.users.findIndex(user => user._id === _id)] = this.getUserAvatarURL(updatedUser);

    return updatedUser;
  }
  async find(data?: IFindDTO) {
    let users = this.users.map(this.getUserAvatarURL);
    if(!data) {
      return users;
    }
    if(data.excludeId) {
      users = users.filter(user => user._id !== data.excludeId);
    }
    if(!data.filter) {
      return users;
    }

    const keys = Object.keys(data.filter);
    const filteredUsers = users.filter(user => {
      const results = keys.map(key => user[key] === data.filter[key]);

      return !results.some(result => result);
    });

    filteredUsers.forEach(user => user.password = undefined);

    return filteredUsers;
  }
  async create(user: IUserDtO) {
    const createdUser: IUser = {
      ...user,
      _id: v4()
    };

    this.users.push(createdUser);

    return { ...createdUser, password: undefined };
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

    return { ...user, avatarUrl };
  }
}
