import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import IUserDtO from "../DTOs/IUserDTO";
import bcrypt from 'bcrypt';

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

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await this.userDao.create({
      name,
      email,
      password: hashedPassword
    });

    return user;
  }
}
