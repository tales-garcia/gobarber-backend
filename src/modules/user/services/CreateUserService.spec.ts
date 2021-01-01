import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import UserDAOMock from "../infra/mongoose/DAOs/mocks/UserDAOMock";
import HashProviderMock from '../providers/HashProvider/mocks/HashProviderMock';
import CreateUserService from "./CreateUserService";

const hashProvider = new HashProviderMock();

describe('Create user', () => {
  it('should be able to create a new user', async () => {
    const userDao = new UserDAOMock();

    const user = await new CreateUserService(userDao, hashProvider).execute(
      {
        name: 'Tales',
        email: 'garcia.tales@gmail.com',
        password: '123456',
        avatar: '3'
      }
    );

    expect(user).toHaveProperty('_id');
  });
  it('should not be able to create an already registered user', async () => {
    const userDao = new UserDAOMock();
    const service = new CreateUserService(userDao, hashProvider);

    const user = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      avatar: undefined
    };

    await service.execute(user);

    expect(service.execute(user)).rejects.toBeInstanceOf(AppError);
  });
});
