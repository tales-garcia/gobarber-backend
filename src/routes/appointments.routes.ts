import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/appointment';

const routes = Router();

interface AppointmentInterface {
  provider: string,
  date: Date
}

routes.post('/', async (req, res) => {
  const { providerId, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointmentInSameDate = await Appointment.findOne({ date: parsedDate });

  if(appointmentInSameDate) {
    return res.status(400).json({ msg: 'Error: Appointment already booked' });
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
})

export default routes;
