import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import HashProviderMock from '../providers/HashProvider/mocks/HashProviderMock';
import CreateUserService from "./CreateUserService";

let hashProvider: HashProviderMock;
let userDao: UserDAOMock;
let service: CreateUserService;

describe('Create user', () => {
  beforeEach(() => {
    userDao = new UserDAOMock();
    hashProvider = new HashProviderMock();

    service = new CreateUserService(userDao, hashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await service.execute(
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
