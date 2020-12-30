import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO
  ) { }

  public async execute() {
    return await this.userDao.find();
  }
}
