import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderMonthAvailabilityService from "@modules/appointment/services/ListProviderMonthAvailabilityService";

export default {
  async index(req: Request, res: Response) {
    const { month, year } = req.body;
    const { id } = req.params;

    const availability = await container.resolve(ListProviderMonthAvailabilityService).execute({
      providerId: id,
      month,
      year
    });

    return res.status(200).json(availability);

  }
}
