import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) { }

  public async execute({ email }: Assign<object, "email", string>) {
    const user = await this.userDao.findByEmail(email);

    if(!user) {
      throw new AppError('Error: User not found', 404);
    }

    this.mailProvider.sendMail(email, 'Recuperação de senha');
  }
}
