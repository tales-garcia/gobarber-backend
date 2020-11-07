import User from '../models/user';
import { Request, Response } from 'express';
import mongoose from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface UserData extends mongoose.Document {
  name: string,
  password: string | undefined,
  email: string
}

export default {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {

      const user = await User.findOne({ email }) as UserData;

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

      const token = jwt.sign({}, 'b732b8998707f85bff73c1bf01e16d14', {
        expiresIn: '1d',
        subject: user.id
      });

      return res.status(200).json({ user, token });
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at logging in'})
    }
  },
  logout: async (req: Request, res: Response) => {

  }
}
