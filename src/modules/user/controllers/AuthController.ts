import User from '../infra/mongoose/DAOs/UserDAO';
import { Request, Response } from 'express';
import mongoose from '@shared/infra/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';
import IUserDAO from '../DAOs/IUserDAO';

interface UserData extends mongoose.Document {
  name: string,
  password: string | undefined,
  email: string
}

export default class AuthController {
  constructor(private userDao: IUserDAO) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {

      const user = await this.userDao.findByEmail(email) as UserData;

      if(!user) {
        return res.status(404).json({ msg: 'Error: User not found'});
      }

      if(!user.password) {
        throw new Error();
      }

      if(!await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ msg: 'Error: Failed at logging: Wrong password'});
      }
      user.password = undefined;

      const token = jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: '1d'
      });

      return res.status(200).json({ user, token });
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at logging in'})
    }
  }
}
