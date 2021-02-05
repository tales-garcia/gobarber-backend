import { inject, injectable } from "tsyringe";
import IUserDAO from "@modules/user/DAOs/IUserDAO";
import AppError from "@shared/errors/AppError";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface Request {
  userId: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ userId }: Request) {
    const cache = await this.cacheProvider.recover(`list-providers-except:${userId}`);

    if (cache) return cache;

    const user = await this.userDao.findById(userId);

    if (!user) {
      throw new AppError('Error: User not found', 404);
    }

    const users = await this.userDao.find({
      excludeId: userId
    });

    await this.cacheProvider.save(`list-providers-except:${userId}`, users);

    return users;
  }
}
