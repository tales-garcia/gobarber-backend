import 'reflect-metadata';
import DiskStorageProviderMock from "@shared/container/providers/StorageProvider/mocks/DiskStorageProviderMock";
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import UpdateAvatarService from "./UpdateAvatarService";

let service: UpdateAvatarService;
let userDao: UserDAOMock;
let diskStorageProvider: DiskStorageProviderMock;

describe('Update user avatar', () => {
  beforeEach(() => {
    userDao = new UserDAOMock();
    diskStorageProvider = new DiskStorageProviderMock();

    service = new UpdateAvatarService(userDao, diskStorageProvider);
  })

  it('should be able to update a created user avatar', async () => {
    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await service.execute({
      filename: 'profile.png',
      userId
    });

    expect(await userDao.findById(userId)).toHaveProperty('avatar', 'profile.png');
  });
  it('should be able to delete the old avatar', async () => {


    const deleteFile = jest.spyOn(diskStorageProvider, 'deleteFile');

    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await service.execute({
      filename: 'profile.png',
      userId
    });

    await service.execute({
      filename: 'avatar.png',
      userId
    });

    expect(deleteFile).toBeCalledWith('profile.png');
    expect(await userDao.findById(userId)).toHaveProperty('avatar', 'avatar.png');
  })
});
