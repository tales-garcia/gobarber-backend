import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute() {
    const cache = await this.cacheProvider.recover('list-users');

    if (cache) return cache;

    const users = await this.userDao.find();

    await this.cacheProvider.save('list-users', users);

    return users;
  }
}
