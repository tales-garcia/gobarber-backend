import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderDayAvailabilityService from "@modules/appointment/services/ListProviderDayAvailabilityService";

export default {
  async index(req: Request, res: Response) {
    const { day, month, year } = req.query;
    const { id } = req.params;
    const availability = await container.resolve(ListProviderDayAvailabilityService).execute({
      providerId: id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });

    return res.status(200).json(availability);

  }
}
