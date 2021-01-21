import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import UserDAOMock from "@modules/user/DAOs/mocks/UserDAOMock";
import ListProvidersService from "./ListProvidersService";

let service: ListProvidersService;
let userDao: UserDAOMock;

describe('Show user profile', () => {
  beforeEach(() => {
    userDao = new UserDAOMock();

    service = new ListProvidersService(userDao);
  });

  it('should be able to list providers', async () => {

    const user = {
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    };

    const createdUser = await userDao.create(user);
    await userDao.create(user);

    const result = await service.execute({
      userId: createdUser._id
    });

    expect(result).not.toContainEqual(createdUser);
  });

  it('should not be able to exclude a nonexistent user', async () => {

    expect(service.execute({
      userId: 'id'
    })).rejects.toBeInstanceOf(AppError);

  });
});
