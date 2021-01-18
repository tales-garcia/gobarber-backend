import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/user/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';
import ShowProfileService from '@modules/user/services/ShowProfileService';

export default {
  async update(req: Request, res: Response) {
    const { oldPassword, ...rest } = req.body;

    try {
      const updatedUser = await container.resolve(UpdateProfileService).execute({
        userId: req.userId,
        oldPassword,
        updateQuery: {
          ...rest
        }
      });

      return res.status(200).json(updatedUser);
    } catch (e) {
      if (e instanceof AppError) {
        return res.status(e.statusCode).json({ msg: e.message });
      }

      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at updating profile' })
    }
  },
  async show(req: Request, res: Response) {
    try {
      const user = await container.resolve(ShowProfileService).execute({
        userId: req.userId
      });

      return res.status(200).json(user);
    } catch (e) {
      if (e instanceof AppError) {
        return res.status(e.statusCode).json({ msg: e.message });
      }

      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at logging in' })
    }
  }
}
