import IUserDtO from '@modules/user/DTOs/IUserDTO';
import CreateUserService from '@modules/user/services/CreateUserService';
import ListUsersService from '@modules/user/services/ListUsersService';
import UpdateAvatarService from '@modules/user/services/UpdateAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await container.resolve(CreateUserService).execute({ name, email, password } as IUserDtO);

    return res.status(201).json(user);
  },
  async index(req: Request, res: Response) {
    const users = await container.resolve(ListUsersService).execute();

    return res.status(200).json({ users });
  },
  async updateAvatar(req: Request, res: Response) {
    const { filename } = req.file;

    await container.resolve(UpdateAvatarService).execute({
      filename,
      userId: req.userId
    });

    return res.status(204).send();
  }
}
