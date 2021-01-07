import 'reflect-metadata';
import DiskStorageProviderMock from "@shared/container/providers/StorageProvider/mocks/DiskStorageProviderMock";
import UserDAOMock from "../DAOs/mocks/UserDAOMock";
import UpdateAvatarService from "./UpdateAvatarService";

describe('Update user avatar', () => {
  it('should be able to update a created user avatar', async () => {
    const userDao = new UserDAOMock();
    const diskStorageProvider = new DiskStorageProviderMock();

    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await new UpdateAvatarService(userDao, diskStorageProvider).execute({
      filename: 'profile.png',
      userId
    });

    expect(await userDao.findById(userId)).toHaveProperty('avatar', 'profile.png');
  });
  it('should be able to delete the old avatar', async () => {
    const userDao = new UserDAOMock();
    const diskStorageProvider = new DiskStorageProviderMock();

    const deleteFile = jest.spyOn(diskStorageProvider, 'deleteFile');

    const { _id: userId } = await userDao.create({
      avatar: undefined,
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'johndoe'
    });

    await new UpdateAvatarService(userDao, diskStorageProvider).execute({
      filename: 'profile.png',
      userId
    });

    await new UpdateAvatarService(userDao, diskStorageProvider).execute({
      filename: 'avatar.png',
      userId
    });

    expect(deleteFile).toBeCalledWith('profile.png');
    expect(await userDao.findById(userId)).toHaveProperty('avatar', 'avatar.png');
  })
});
