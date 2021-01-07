import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import IUserTokenDAO from "../DAOs/IUserTokenDAO";

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
    @inject('UserTokenDAO')
    private usersTokensDao: IUserTokenDAO
  ) { }

  public async execute({ email }: Assign<object, "email", string>) {
    const user = await this.userDao.findByEmail(email) as unknown as Assign<object, "_id", string>;

    if(!user) {
      throw new AppError('Error: User not found', 404);
    }

    await this.usersTokensDao.generate(user._id);

    this.mailProvider.sendMail(email, 'Recuperação de senha');
  }
}
