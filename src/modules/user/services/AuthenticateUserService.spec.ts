import 'reflect-metadata';
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import CreateUserService from "./CreateUserService";
import AuthenticateUserService from './AuthenticateUserService';
import AppError from '@shared/errors/AppError';
import HashProviderMock from '../providers/HashProvider/mocks/HashProviderMock';

let authenticateService: AuthenticateUserService;
let createService: CreateUserService;
let hashProvider: HashProviderMock;
let userDao: UserDAOMock;

describe('Create user', () => {
  beforeEach(() => {
    userDao = new UserDAOMock();
    hashProvider = new HashProviderMock();

    createService = new CreateUserService(userDao, hashProvider);
    authenticateService = new AuthenticateUserService(userDao, hashProvider);
  });
  it('should be able to authenticate a created user', async () => {
    await createService.execute(
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
    await createService.execute(
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
