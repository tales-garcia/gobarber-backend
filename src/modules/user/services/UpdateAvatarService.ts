import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface Request {
  filename: string;
  userId: string;
}

@injectable()
export default class UpdateAvatarService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  public async execute({ userId, filename }: Request) {
    const user = await this.userDao.findById(userId);
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    await this.storageProvider.saveFile(filename);

    await this.userDao.findByIdAndUpdate(userId, {
        avatar: filename
    });
  }
}
