import { Request, Response } from "express";
import CreateAppointmentService from "@modules/appointment/services/CreateAppointmentService";
import { container } from "tsyringe";
import AppError from "@shared/errors/AppError";
import ListAppointmentsService from "@modules/appointment/services/ListAppointmentsService";

export default {
  async create(req: Request, res: Response) {
    const { providerId, date } = req.body;

    try {
      const appointment = await container.resolve(CreateAppointmentService).execute({
        providerId,
        date
      });

      return res.status(201).json(appointment);
    } catch (e) {
      if(e instanceof AppError) {
        return res.status(e.statusCode).json({ msg: e.message });
      }

      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at creating appointment' });
    }
  },
  async index(req: Request, res: Response) {
    try {
      const appointments = await container.resolve(ListAppointmentsService).execute();

      return res.status(200).json(appointments);

    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing appointments' })
    }
  }
}
