import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import IUserDtO from "../DTOs/IUserDTO";

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO
  ) { }

  public async execute({ email, name, password }: IUserDtO) {
    const userWithSameEmail = await this.userDao.findByEmail(email);

    if (userWithSameEmail) {
      throw new AppError('Error: Failed at creating user: User already created', 400);
    }
    const user = await this.userDao.create({
      name,
      email,
      password
    });

    return user;
  }
}
