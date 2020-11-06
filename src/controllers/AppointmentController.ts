import { Request, Response } from "express";
import { startOfHour, parseISO } from 'date-fns';
import Appointment from '../models/appointment';
import User from "../models/user";


export default {
  create: async (req: Request, res: Response) => {
    const { providerId, date } = req.body;

    const parsedDate = startOfHour(parseISO(date));

    const appointmentInSameDate = await Appointment.findOne({ date: parsedDate });

    if(appointmentInSameDate) {
      return res.status(400).json({ msg: 'Error: Appointment already booked' });
    }

    const appointmentProvider = await User.findById(providerId);

    if(!appointmentProvider) {
      return res.status(400).json({ msg: 'Error: Provider not found'})
    }
    try {
      const appointment = await Appointment.create({
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
      const appointments = await Appointment.find();

      return res.status(200).json(appointments);

    } catch(e) {
      console.log(e);
      return res.status(500).json({ msg: 'Error: Failed at listing appointments' })
    }
  },
  delete: (req: Request, res: Response) => {

  },
  update: (req: Request, res: Response) => {

  }
}
