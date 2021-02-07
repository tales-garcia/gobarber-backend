import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import IUserDtO from "../DTOs/IUserDTO";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ email, name, password }: IUserDtO) {
    const userWithSameEmail = await this.userDao.findByEmail(email);

    if (userWithSameEmail) {
      throw new AppError('Error: Failed at creating user: User already created', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userDao.create({
      name,
      email,
      password: hashedPassword,
      avatar: undefined
    });

    await this.cacheProvider.invalidate('list-users');
    await this.cacheProvider.invalidateMatching(user._id);

    return user;
  }
}
