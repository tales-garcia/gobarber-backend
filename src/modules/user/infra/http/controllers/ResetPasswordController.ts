import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/user/services/ResetPasswordService';

export default {
  async create(req: Request, res: Response) {
    const { token, password } = req.body;

    await container.resolve(ResetPasswordService).execute({
      token,
      password
    });

    return res.status(204).send();
  }
}
