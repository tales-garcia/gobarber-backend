import { Request, Response } from "express";
import { container } from "tsyringe";
import AppError from "@shared/errors/AppError";
import ListProviderMonthAvailabilityService from "@modules/appointment/services/ListProviderMonthAvailabilityService";

export default {
  async index(req: Request, res: Response) {
    const { month, year } = req.body;
    const { id } = req.params;
    try {
      const availability = await container.resolve(ListProviderMonthAvailabilityService).execute({
        providerId: id,
        month,
        year
      });

      return res.status(200).json(availability);

    } catch (e) {
      if(e instanceof AppError) {
        return res.status(e.statusCode).json({ msg: e.message });
      }

      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing availability' })
    }
  }
}
