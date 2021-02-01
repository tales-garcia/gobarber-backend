import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SendForgotPasswordEmailService from '@modules/user/services/SendForgotPasswordEmailService';

export default {
  async create(req: Request, res: Response) {
    const { email } = req.body;

    await container.resolve(SendForgotPasswordEmailService).execute({
      email
    });

    return res.status(204).send();
  }
}
