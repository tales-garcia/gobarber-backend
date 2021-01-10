import IMailProvider from "../models/IMailProvider";
import nodemailer, { Transporter } from 'nodemailer';

export default class MailProviderMock implements IMailProvider {
  private client: Transporter;

  constructor() {
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

  async sendMail(to: string, title: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'GoBarber <hi@gobarber.com.br>',
      to,
      subject: title,
      text: body
    });
    console.log(nodemailer.getTestMessageUrl(message));

  }
}
