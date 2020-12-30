import IUserDtO from '@modules/user/DTOs/IUserDTO';
import CreateUserService from '@modules/user/services/CreateUserService';
import ListUsersService from '@modules/user/services/ListUsersService';
import UpdateAvatarService from '@modules/user/services/UpdateAvatarService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserDAO from '../../mongoose/DAOs/UserDAO';

export default {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
      const user = await container.resolve(CreateUserService).execute({ name, email, password } as IUserDtO);

      return res.status(201).json(user);
    } catch(e) {
      if(e instanceof AppError) {
        return res.status(e.statusCode).json({ msg: e.message });
      }

      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at creating user'});
    }
  },
  async index(req: Request, res: Response) {
    try {
      const users = await container.resolve(ListUsersService).execute();

      return res.status(200).json({ users });
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing users'});
    }
  },
  async updateAvatar(req: Request, res: Response) {
    try {
      const { filename } = req.file;

      await container.resolve(UpdateAvatarService).execute({
        filename,
        userId: req.userId
      });

      return res.status(204).send();
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at updating avatar'});
    }
  }
}
