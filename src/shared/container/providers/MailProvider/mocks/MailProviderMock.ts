import IMailProvider from "../models/IMailProvider";

interface Message {
  to: string;
  body: string;
}

export default class MailProviderMock implements IMailProvider {
  private messages: Message[] = [];

  async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({ to, body });
  }
}
