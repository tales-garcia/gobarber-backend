import 'reflect-metadata';
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import AuthenticateUserService from './AuthenticateUserService';
import AppError from '@shared/errors/AppError';
import HashProviderMock from '../providers/HashProvider/mocks/HashProviderMock';

let authenticateService: AuthenticateUserService;
let hashProvider: HashProviderMock;
let userDao: UserDAOMock;

describe('Create user', () => {
  beforeEach(() => {
    userDao = new UserDAOMock();
    hashProvider = new HashProviderMock();

    authenticateService = new AuthenticateUserService(userDao, hashProvider);
  });
  it('should be able to authenticate a created user', async () => {
    await userDao.create(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        avatar: '3'
      }
    );

    const response = await authenticateService.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
  });
  it('should not be able to authenticate a created user with a wrong password', async () => {
    await userDao.create(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        avatar: '3'
      }
    );

    expect(authenticateService.execute({
      email: 'johndoe@example.com',
      password: '1234567'
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate an unregistered user', async () => {
    expect(authenticateService.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });
});
