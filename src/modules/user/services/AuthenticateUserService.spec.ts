import 'reflect-metadata';
import UserDAOMock from "../infra/mongoose/DAOs/mocks/UserDAOMock";
import CreateUserService from "./CreateUserService";
import AuthenticateUserService from './AuthenticateUserService';
import AppError from '@shared/errors/AppError';
import HashProviderMock from '../providers/HashProvider/mocks/HashProviderMock';

const hashProvider = new HashProviderMock();

describe('Create user', () => {
  it('should be able to authenticate a created user', async () => {
    const userDao = new UserDAOMock();

    await new CreateUserService(userDao, hashProvider).execute(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        avatar: '3'
      }
    );

    const response = await new AuthenticateUserService(userDao, hashProvider).execute({
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
  });
  it('should not be able to authenticate a created user with a wrong password', async () => {
    const userDao = new UserDAOMock();

    await new CreateUserService(userDao, hashProvider).execute(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        avatar: '3'
      }
    );

    expect(new AuthenticateUserService(userDao, hashProvider).execute({
      email: 'johndoe@example.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(AppError);
  });
});
