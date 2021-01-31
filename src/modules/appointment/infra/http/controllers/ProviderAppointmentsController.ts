import { Request, Response } from "express";
import { container } from "tsyringe";
import AppError from "@shared/errors/AppError";
import ListProviderAppointmentsService from "@modules/appointment/services/ListProviderAppointmentsService";

export default {
  async index(req: Request, res: Response) {
    const providerId = req.userId;
    const { day, month, year } = req.body;
    try {
      const appointments = await container.resolve(ListProviderAppointmentsService).execute({
        providerId,
        day,
        month,
        year
      });

      return res.status(200).json(appointments);

    } catch (e) {
      if (e instanceof AppError) {
        return res.status(e.statusCode).json({ msg: e.message });
      }

      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing appointments' })
    }
  }
}
