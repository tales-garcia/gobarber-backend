import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/user/services/UpdateProfileService';
import ShowProfileService from '@modules/user/services/ShowProfileService';

export default {
  async update(req: Request, res: Response) {
    const { oldPassword, ...rest } = req.body;

    const updatedUser = await container.resolve(UpdateProfileService).execute({
      userId: req.userId,
      oldPassword,
      updateQuery: {
        ...rest
      }
    });

    return res.status(200).json(updatedUser);
  },
  async show(req: Request, res: Response) {
    const user = await container.resolve(ShowProfileService).execute({
      userId: req.userId
    });

    return res.status(200).json(user);
  }
}
