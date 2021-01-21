import { inject, injectable } from "tsyringe";
import IUserDAO from "@modules/user/DAOs/IUserDAO";
import AppError from "@shared/errors/AppError";

interface Request {
  userId: string;
}

@injectable()
export default class ListProvidersService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO
  ) { }

  public async execute({ userId }: Request) {
    const user = await this.userDao.findById(userId);

    if (!user) {
      throw new AppError('Error: User not found', 404);
    }

    const users = await this.userDao.find({
      excludeId: userId
    });

    return users;
  }
}
