import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import fs from 'fs';
import path from 'path';
import { directory } from "@config/upload";

interface Request {
  filename: string;
  userId: string;
}

@injectable()
export default class UpdateAvatarService {
  constructor(
    @inject('UserDAO')
    private userDao: IUserDAO
  ) { }

  public async execute({ userId, filename }: Request) {
    const user = await this.userDao.findById(userId);
    if (user.avatar) {
      if (await fs.promises.stat(directory)) {
        await fs.promises.unlink(path.join(directory, user.avatar));
      }
    }

    await this.userDao.findByIdAndUpdate(userId, {
        avatar: filename
    });
  }
}
