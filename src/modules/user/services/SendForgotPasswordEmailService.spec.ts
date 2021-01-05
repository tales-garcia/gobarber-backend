import 'reflect-metadata';
import MailProviderMock from "@shared/container/providers/MailProvider/mocks/MailProviderMock";
import UserDAOMock from "../infra/mongoose/DAOs/mocks/UserDAOMock";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import AppError from '@shared/errors/AppError';

describe('Send forgot password email', () => {
  it('should be able to send a forgot password email', async () => {
    const mailProvider = new MailProviderMock();
    const userDao = new UserDAOMock();

    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await new SendForgotPasswordEmailService(userDao, mailProvider).execute({ email: 'johndoe@example.com' });

    expect(sendMail).toBeCalledWith('johndoe@example.com', 'Recuperação de senha');
  });
  it('should not be able to send a forgot password email to an unregistered user', async () => {
    const mailProvider = new MailProviderMock();
    const userDao = new UserDAOMock();

    expect(new SendForgotPasswordEmailService(userDao, mailProvider)
      .execute({ email: 'johndoe@example.com' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
