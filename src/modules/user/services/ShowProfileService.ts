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
    private userDao: IUserDAO
  ) { }

  public async execute({ userId }: Request) {
    const user = await this.userDao.findById(userId);

    if (!user) {
      throw new AppError('Error: User not found', 404);
    }

    return user;
  }
}
