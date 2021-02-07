import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";

interface Request {
  userId: string;
}

@injectable()
export default class showProfileService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ userId }: Request) {
    const cache = await this.cacheProvider.recover(`show-profile:${userId}`);

    if (cache) return cache;

    const user = await this.userDao.findById(userId);

    if (!user) {
      throw new AppError('Error: User not found', 404);
    }

    user.password = undefined;

    await this.cacheProvider.save(`show-profile:${userId}`, user);

    return user;
  }
}
