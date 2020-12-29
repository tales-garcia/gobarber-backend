import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

export default {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { user, token } = await container.resolve(AuthenticateUserService).execute({
        email,
        password
      });

      return res.status(200).json({ user, token });
    } catch (e) {
      if (e instanceof AppError) {
        return res.status(e.statusCode).json({ msg: e.message });
      }

      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at logging in' })
    }
  }
}
