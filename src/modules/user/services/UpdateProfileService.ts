import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import IUserDtO from "../DTOs/IUserDTO";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
  userId: string;
  oldPassword?: string;
  updateQuery: OptionalKeys<IUserDtO>;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ userId, updateQuery, oldPassword }: Request) {
    const user = await this.userDao.findById(userId);

    if (updateQuery.email) {
      if (await this.userDao.findByEmail(updateQuery.email)) {
        throw new AppError('Error: Email already used', 400);
      }
    }

    if (!user) {
      throw new AppError('Error: User not found', 404);
    }

    if (updateQuery.password && !oldPassword) {
      throw new AppError('Error: Old password required', 403);
    }

    if (updateQuery.password && oldPassword) {
      if (!await this.hashProvider.compareHash(oldPassword, updateQuery.password)) {
        throw new AppError('Error: Wrong password', 401);
      }
      Object.assign(updateQuery, {
        password: await this.hashProvider.generateHash(updateQuery.password)
      });
    }

    return await this.userDao.findByIdAndUpdate(userId, updateQuery);
  }
}
