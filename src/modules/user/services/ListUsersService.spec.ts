import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import HashProviderMock from '../providers/HashProvider/mocks/HashProviderMock';
import CreateUserService from "./CreateUserService";
import ListUsersService from './ListUsersService';

let listService: ListUsersService;
let createService: CreateUserService;
let hashProvider: HashProviderMock;
let userDao: UserDAOMock;

describe('Create user', () => {
  beforeEach(() => {
    hashProvider = new HashProviderMock();
    userDao = new UserDAOMock();

    createService = new CreateUserService(userDao, hashProvider);
    listService = new ListUsersService(userDao);
  });
  it('should be able to list users', async () => {
    const users = await listService.execute();

    expect(users).toStrictEqual([]);
  });
  it('should be able to list a created user', async () => {
    await createService.execute(
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
        avatar: '3'
      }
    );

    const users = await listService.execute();

    expect(users).toHaveLength(1);
  });
});
