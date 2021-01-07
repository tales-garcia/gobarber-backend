import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import HashProviderMock from '../providers/HashProvider/mocks/HashProviderMock';
import CreateUserService from "./CreateUserService";
import ListUsersService from './ListUsersService';

const hashProvider = new HashProviderMock();

describe('Create user', () => {
  it('should be able to list users', async () => {
    const userDao = new UserDAOMock();

    const users = await new ListUsersService(userDao).execute();

    expect(users).toStrictEqual([]);
  });
  it('should be able to list a created user', async () => {
    const userDao = new UserDAOMock();

    await new CreateUserService(userDao, hashProvider).execute(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        avatar: '3'
      }
    );

    const users = await new ListUsersService(userDao).execute();

    expect(users).toHaveLength(1);
  });
});
