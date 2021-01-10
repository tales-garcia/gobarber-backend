import IMailProvider from "../models/IMailProvider";

interface Message {
  to: string;
  body: string;
  subject: string;
}

export default class MailProviderMock implements IMailProvider {
  private messages: Message[] = [];

  async sendMail(to: string, subject: string, body: string): Promise<void> {
    this.messages.push({ to, subject, body });
  }
}
