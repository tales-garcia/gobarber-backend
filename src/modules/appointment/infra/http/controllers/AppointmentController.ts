import { Request, Response } from "express";
import CreateAppointmentService from "@modules/appointment/services/CreateAppointmentService";
import { container } from "tsyringe";
import ListAppointmentsService from "@modules/appointment/services/ListAppointmentsService";

export default {
  async create(req: Request, res: Response) {
    const clientId = req.userId;
    const { providerId, date } = req.body;

    const appointment = await container.resolve(CreateAppointmentService).execute({
      providerId,
      clientId,
      date
    });

    return res.status(201).json(appointment);
  },
  async index(req: Request, res: Response) {
    const appointments = await container.resolve(ListAppointmentsService).execute();

    return res.status(200).json(appointments);

  }
}
