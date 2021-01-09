import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from '@modules/user/services/ResetPasswordService';

export default {
  async create(req: Request, res: Response) {
    const { token, password } = req.body;

    try {
      await container.resolve(ResetPasswordService).execute({
        token,
        password
      });

      return res.status(204).send();
    } catch (e) {
      if (e instanceof AppError) {
        return res.status(e.statusCode).json({ msg: e.message });
      }

      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at reseting password' })
    }
  }
}
