import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import IUserTokenDAO from "../DAOs/IUserTokenDAO";
import path from "path";

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
    const user = await this.userDao.findByEmail(email);

    if(!user) {
      throw new AppError('Error: User not found', 404);
    }

    const { token } = await this.usersTokensDao.generate(user._id);

    const forgotPasswordPath = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        email,
        name: user.name
      },
      subject: 'Recuperação de senha',
      templateData: {
        file: forgotPasswordPath,
        variables: {
          link: `${process.env.FRONTEND_URL}/reset?token=${token}`,
          name: user.name
        }
      }
    });
  }
}
