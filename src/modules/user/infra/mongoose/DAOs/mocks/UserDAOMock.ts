import IUserDAO from "@modules/user/DAOs/IUserDAO";
import IUserDtO from "@modules/user/DTOs/IUserDTO";
import { uuid } from "uuidv4";

interface IUser extends IUserDtO {
  _id: string;
}

export default class UserDAOMock implements IUserDAO {
  private users: IUser[] = [];

  async findOne(filter: object) {
    return this.users.find(user => {
      const results = Object.keys(filter).map(key => user[key] === filter[key]);

      return !results.some(result => result);
    });
  }
  async findByEmail(email: string) {
    return await this.findOne({ email });
  }
  async findById(_id: string) {
    return await this.findOne({ _id });
  }
  async findByIdAndUpdate(_id: string, query: IUserDtO) {
    const updatedUser = await this.findById(_id);

    const keys = Object.keys(query);

    keys.forEach(key => {
      if(updatedUser[key]) {
        updatedUser[key] = query[key];
      }
    })

    this.users.forEach(user => {
      if(user._id === _id) {
        return updatedUser;
      }

      return user;
    });

    return updatedUser;
  }
  async find(filter?: object) {
    if(!filter) {
      return this.users;
    }

    const keys = Object.keys(filter);
    const filteredUsers = this.users.filter(user => {
      const results = keys.map(key => user[key] === filter[key]);

      return !results.some(result => result);
    });

    filteredUsers.forEach(user => user.password = undefined);

    return filteredUsers;
  }
  async create(user: IUserDtO) {
    const createdUser: IUser = {
      ...user,
      _id: uuid()
    };

    this.users.push(createdUser);

    createdUser.password = undefined;

    return createdUser;
  }
}
