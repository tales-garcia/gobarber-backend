import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import ShowProfileService from "./ShowProfileService";

let service: ShowProfileService;
let userDao: UserDAOMock;

describe('Show user profile', () => {
  beforeEach(() => {
    userDao = new UserDAOMock();

    service = new ShowProfileService(userDao);
  });

  it('should be able to show the user profile', async () => {

    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    const user = await service.execute({
      userId
    });

    expect(user).toHaveProperty('email', 'johndoe@example.com');
    expect(user).toHaveProperty('name', 'John Doe');
  });

  it('should not be able to show the an inexistent user profile', async () => {

    expect(service.execute({
      userId: 'id'
    })).rejects.toBeInstanceOf(AppError);

  });
});
