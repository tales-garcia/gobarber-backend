import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProvidersService from "@modules/appointment/services/ListProvidersService";

export default {
  async index(req: Request, res: Response) {
    const appointments = await container.resolve(ListProvidersService).execute({ userId: req.userId });

    return res.status(200).json(appointments);

  }
}
