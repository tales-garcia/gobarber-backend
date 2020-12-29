import { inject, injectable } from "tsyringe";
import IUserDAO from "../DAOs/IUserDAO";
import fs from 'fs';
import path from 'path';

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
      if (await fs.promises.stat(process.env.NODE_ENV === 'prod' ?
        path.resolve(__dirname, '..', '..', '..', '..', 'uploads', user.avatar)
        :
        path.resolve(__dirname, 'uploads', user.avatar)
      )) {
        await fs.promises.unlink(process.env.NODE_ENV === 'prod' ?
          path.resolve(__dirname, '..', '..', '..', '..', 'uploads', user.avatar)
          :
          path.resolve(__dirname, 'uploads', user.avatar)
        );
      }
    }

    await this.userDao.findByIdAndUpdate(userId, {
      $set: {
        avatar: filename
      }
    });
  }
}
