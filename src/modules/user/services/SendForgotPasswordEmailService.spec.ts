import 'reflect-metadata';
import MailProviderMock from "@shared/container/providers/MailProvider/mocks/MailProviderMock";
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";
import AppError from '@shared/errors/AppError';
import UserTokenDAOMock from '../DAOs/mocks/UserTokenDAOMock';

let mailProvider: MailProviderMock;
let userDao: UserDAOMock;
let userTokenDao: UserTokenDAOMock;
let service: SendForgotPasswordEmailService;

describe('Send forgot password email', () => {
  beforeEach(() => {
    mailProvider = new MailProviderMock();
    userDao = new UserDAOMock();
    userTokenDao = new UserTokenDAOMock();

    service = new SendForgotPasswordEmailService(userDao, mailProvider, userTokenDao);
  });

  it('should be able to send a forgot password email', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await service.execute({ email: 'johndoe@example.com' });

    expect(sendMail).toBeCalledWith('johndoe@example.com', 'Recuperação de senha');
  });
  it('should not be able to send a forgot password email to an unregistered user', async () => {
    expect(service.execute({ email: 'johndoe@example.com' })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to generate a user token', async () => {
    const generate = jest.spyOn(userTokenDao, 'generate');

    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await service.execute({ email: 'johndoe@example.com' });

    expect(generate).toBeCalledWith(userId);
  });
});
