import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';
import ISendMailDTO from "../dtos/ISendMailDTO";
import IMailTemplateProvider from "../../MailTemplateProvider/models/IMailTemplateProvider";
import { inject, injectable } from "tsyringe";

@injectable()
export default class MailProviderMock implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
      this.client = transporter;
    });
  }

  async sendMail({ to, subject, templateData, from }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        address: from?.email || 'hi@gobarber.com.br',
        name: from?.name || 'GoBarber'
      },
      to: {
        address: to.email,
        name: to.name
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });
    console.log(nodemailer.getTestMessageUrl(message));

  }
}
