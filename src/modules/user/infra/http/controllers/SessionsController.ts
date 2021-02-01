import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';

export default {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;

    const { user, token } = await container.resolve(AuthenticateUserService).execute({
      email,
      password
    });

    return res.status(200).json({ user, token });
  }
}
