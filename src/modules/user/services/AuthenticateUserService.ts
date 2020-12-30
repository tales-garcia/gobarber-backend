import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';

interface Request {
  email: string;
  password: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO
  ) { }

  public async execute({ email, password }: Request) {
    const user = await this.userDao.findByEmail(email);

    if (!user) {
      throw new AppError('Error: User not found', 404);
    }

    if (!user.password) {
      throw new Error();
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new AppError('Error: Failed at logging: Wrong password', 401);
    }
    user.password = undefined;

    const token = jwt.sign({ _id: (user as any)._id }, authConfig.secret, {
      expiresIn: '1d'
    });

    return { user, token };
  }
}
