import 'reflect-metadata';
import HashProviderMock from "../providers/HashProvider/mocks/HashProviderMock";
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import UpdateProfileService from "./UpdateProfileService";
import AppError from '@shared/errors/AppError';
import CacheProviderMock from '@shared/container/providers/CacheProvider/mocks/CacheProviderMock';

let service: UpdateProfileService;
let userDao: UserDAOMock;
let HashProvider: HashProviderMock;
let cacheProvider: CacheProviderMock;

describe('Update user profile', () => {
  beforeEach(() => {
    userDao = new UserDAOMock();
    HashProvider = new HashProviderMock();
    cacheProvider = new CacheProviderMock();

    service = new UpdateProfileService(userDao, HashProvider, cacheProvider);
  });

  it('should be able to update the user', async () => {

    const generateHash = jest.spyOn(HashProvider, 'generateHash');

    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await service.execute({
      oldPassword: 'johndoe',
      updateQuery: {
        password: '123456',
        name: 'Johndoe',
        email: 'john.doe@example.com'
      },
      userId
    });

    const updatedUser = await userDao.findById(userId);

    expect(generateHash).toBeCalledWith('123456');
    expect(updatedUser).toHaveProperty('email', 'john.doe@example.com');
    expect(updatedUser).toHaveProperty('name', 'Johndoe');
  });
  it('should not be able to update the user password without old password', async () => {

    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await expect(service.execute({
      updateQuery: {
        password: '123456',
        name: 'Johndoe',
        email: 'john.doe@example.com'
      },
      userId
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update an inexistent user', async () => {

    await expect(service.execute({
      updateQuery: {},
      userId: 'id'
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the user password with a wrong old password', async () => {

    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await expect(service.execute({
      oldPassword: '1234567',
      updateQuery: {
        password: '123456',
        name: 'Johndoe',
        email: 'john.doe@example.com'
      },
      userId
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the user email if the email is already used', async () => {

    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await userDao.create({
      avatar: undefined,
      email: 'john.doe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await expect(service.execute({
      oldPassword: '1234567',
      updateQuery: {
        password: '123456',
        name: 'Johndoe',
        email: 'john.doe@example.com'
      },
      userId
    })).rejects.toBeInstanceOf(AppError);
  });
});
