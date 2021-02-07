import 'reflect-metadata';
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import HashProviderMock from '../providers/HashProvider/mocks/HashProviderMock';
import ListUsersService from './ListUsersService';
import CacheProviderMock from '@shared/container/providers/CacheProvider/mocks/CacheProviderMock';

let listService: ListUsersService;
let hashProvider: HashProviderMock;
let userDao: UserDAOMock;
let cacheProvider: CacheProviderMock;

describe('Create user', () => {
  beforeEach(() => {
    hashProvider = new HashProviderMock();
    userDao = new UserDAOMock();
    cacheProvider = new CacheProviderMock();

    listService = new ListUsersService(userDao, cacheProvider);
  });
  it('should be able to list users', async () => {
    const users = await listService.execute();

    expect(users).toStrictEqual([]);
  });
  it('should be able to list a created user', async () => {
    await userDao.create(
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
