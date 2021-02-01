import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderAppointmentsService from "@modules/appointment/services/ListProviderAppointmentsService";

export default {
  async index(req: Request, res: Response) {
    const providerId = req.userId;
    const { day, month, year } = req.body;

    const appointments = await container.resolve(ListProviderAppointmentsService).execute({
      providerId,
      day,
      month,
      year
    });

    return res.status(200).json(appointments);

  }
}
