import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import IUserDao from '../DAOs/IUserDAO';

export default class UserController {
  constructor(private userDao: IUserDao) {}

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const userWithSameEmail = await this.userDao.findByEmail(email);

      if(userWithSameEmail) {
        return res.status(400).json({ msg: 'Error: Failed at creating user: User already created' })
      }
      const user = await this.userDao.create({
        name,
        email,
        password
      });

      return res.status(201).json(user);
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at creating user'});
    }
  }
  async index(req: Request, res: Response) {
    try {
      const users = await this.userDao.find();

      return res.status(200).json({ users });
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing users'});
    }
  }
  async updateAvatar(req: Request, res: Response) {
    try {
      const { filename } = req.file;
      const user = await this.userDao.findById(req.userId);
      if(user.avatar) {
        if(await fs.promises.stat(process.env.NODE_ENV === 'prod' ?
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

      await this.userDao.findByIdAndUpdate(req.userId, {
        $set: {
          avatar: filename
        }
      });

      return res.status(204).send();
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at updating avatar'});
    }
  }
}
