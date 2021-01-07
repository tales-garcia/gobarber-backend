import 'reflect-metadata';
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import UserTokenDAOMock from '../DAOs/mocks/UserTokenDAOMock';
import ResetPasswordService from './ResetPasswordService';

let userDao: UserDAOMock;
let userTokenDao: UserTokenDAOMock;
let service: ResetPasswordService;

describe('Reset user password', () => {
  beforeEach(() => {
    userDao = new UserDAOMock();
    userTokenDao = new UserTokenDAOMock();

    service = new ResetPasswordService(userDao, userTokenDao);
  });

  it('should be able to reset password', async () => {

    const { _id } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    const { token } = await userTokenDao.generate(_id);

    await service.execute({ token, password: '1223334444' });

    const user = await userDao.findById(_id);

    expect(user).toHaveProperty('password', '1223334444');

  });
});
