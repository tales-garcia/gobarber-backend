import User from '../models/user';
import { Request, Response } from 'express';
import mongoose from '../database';

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
  update: async (req: Request, res: Response) => {

  },
  delete: async (req: Request, res: Response) => {

  }
}
