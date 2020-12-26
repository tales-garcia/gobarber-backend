import { Request, Response } from "express";
import { startOfHour, parseISO } from 'date-fns';
import AppointmentDAO from '../infra/mongoose/DAOs/AppointmentDAO';


export default {
  create: async (req: Request, res: Response) => {
    const { providerId, date } = req.body;

    const parsedDate = startOfHour(parseISO(date));

    const appointmentInSameDate = await new AppointmentDAO().findByDate(parsedDate);

    if(appointmentInSameDate) {
      return res.status(400).json({ msg: 'Error: Appointment already booked' });
    }

    try {
      const appointment = await AppointmentDAO.create({
        providerId,
        date: parsedDate
      });

      return res.status(201).json(appointment);
    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at creating appointment' });
    }
  },
  index: async (req: Request, res: Response) => {
    try {
      const appointments = await AppointmentDAO.find();

      return res.status(200).json(appointments);

    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing appointments' })
    }
  }
}
