import { Request, Response } from "express";
import { container } from "tsyringe";
import AppError from "@shared/errors/AppError";
import ListProvidersService from "@modules/appointment/services/ListProvidersService";

export default {
  async index(req: Request, res: Response) {
    try {
      const appointments = await container.resolve(ListProvidersService).execute({ userId: req.userId });

      return res.status(200).json(appointments);

    } catch (e) {
      if(e instanceof AppError) {
        return res.status(e.statusCode).json({ msg: e.message });
      }

      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing appointments' })
    }
  }
}
