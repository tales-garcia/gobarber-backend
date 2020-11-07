import User from '../models/user';
import { Request, Response } from 'express';
import mongoose from '../database';
import fs from 'fs';
import path from 'path';

interface UserData extends mongoose.Document {
  name: string,
  password: string | undefined,
  email: string
}

export default {
  create: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const userWithSameEmail = await User.findOne({ email });

      if(userWithSameEmail) {
        return res.status(400).json({ msg: 'Error: Failed at creating user: User already created' })
      }
      const user = await User.create({
        name,
        email,
        password
      }) as UserData;

      user.password = undefined;

      return res.status(201).json(user);
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at creating user'});
    }
  },
  index: async (req: Request, res: Response) => {
    try {
      const users = await User.find() as UserData[];

      users.forEach(user => user.password = undefined);

      return res.status(200).json({ users });
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing users'});
    }
  },
  updateAvatar: async (req: Request, res: Response) => {
    try {
      const { filename } = req.file;

      if(!fs.existsSync(path.resolve(__dirname, '..', '..', 'uploads', filename))) {
        return res.status(404).json({ msg: 'Error: Failed at updating user avatar: File not found' })
      }

      await User.findByIdAndUpdate(req.userId, {
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
