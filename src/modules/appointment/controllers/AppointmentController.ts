import { Request, Response } from "express";
import { startOfHour, parseISO } from 'date-fns';
import IAppointmentDAO from "../DAOs/IAppointmentDAO";


export default class AppointmentsController {
  constructor(private appointmentDAO: IAppointmentDAO) {}

  async create(req: Request, res: Response) {
    const { providerId, date } = req.body;

    const parsedDate = startOfHour(parseISO(date));

    const appointmentInSameDate = await this.appointmentDAO.findByDate(parsedDate);

    if(appointmentInSameDate) {
      return res.status(400).json({ msg: 'Error: Appointment already booked' });
    }

    try {
      const appointment = await this.appointmentDAO.create({
        providerId,
        date: parsedDate
      });

      return res.status(201).json(appointment);
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at creating appointment' });
    }
  }
  async index(req: Request, res: Response) {
    try {
      const appointments = await this.appointmentDAO.find();

      return res.status(200).json(appointments);

    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing appointments' })
    }
  }
}
