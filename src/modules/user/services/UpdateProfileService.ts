import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import IUserDtO from "../DTOs/IUserDTO";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface Request {
  userId: string;
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

  public async execute({ userId, updateQuery }: Request) {
    const user = await this.userDao.findById(userId);

    if (!user) {
      throw new AppError('Error: User not found', 404);
    }

    if (updateQuery.password) {
      Object.assign(updateQuery, {
        password: await this.hashProvider.generateHash(updateQuery.password)
      });
    }

    await this.userDao.findByIdAndUpdate(userId, updateQuery);
  }
}
