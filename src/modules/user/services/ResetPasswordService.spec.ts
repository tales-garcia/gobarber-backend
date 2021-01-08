import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import UserTokenDAOMock from '../DAOs/mocks/UserTokenDAOMock';
import HashProviderMock from '../providers/HashProvider/mocks/HashProviderMock';
import ResetPasswordService from './ResetPasswordService';

let userDao: UserDAOMock;
let userTokenDao: UserTokenDAOMock;
let hashProvider: HashProviderMock;
let service: ResetPasswordService;

describe('Reset user password', () => {
  beforeEach(() => {
    userDao = new UserDAOMock();
    userTokenDao = new UserTokenDAOMock();
    hashProvider = new HashProviderMock();

    service = new ResetPasswordService(userDao, userTokenDao, hashProvider);
  });

  it('should be able to reset password', async () => {
    const generateHash = jest.spyOn(hashProvider, 'generateHash');

    const { _id } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    const { token } = await userTokenDao.generate(_id);

    await service.execute({ token, password: '1223334444' });

    const user = await userDao.findById(_id);

    expect(generateHash).toBeCalledWith('1223334444');
    expect(user).toHaveProperty('password', '1223334444');

  });
  it('should not be able to reset password with an unregistered token', async () => {
    expect(
      service.execute({
        password: '123456',
        token: 'token'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset an unregistered user password', async () => {
    const { token } = await userTokenDao.generate('id');

    expect(service.execute({
      token,
      password: '1223334444'
    })).rejects.toBeInstanceOf(AppError);
  });
});
