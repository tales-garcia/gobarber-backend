import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import IUserTokenDAO from "../DAOs/IUserTokenDAO";

interface IRequest {
  token: string,
  password: string
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('UserTokenDAO')
    private userTokenDao: IUserTokenDAO
  ) { }

  public async execute({ token, password }: IRequest) {
    const userToken = await this.userTokenDao.findByToken(token);

    if (!userToken) {
      throw new AppError('Error: Invalid token', 401);
    }

    const user = await this.userDao.findById(userToken.userId);

    if (!user) {
      throw new AppError('Error: User not found', 404);
    }

    await this.userDao.findByIdAndUpdate(user._id, {
      password
    });
  }
}
