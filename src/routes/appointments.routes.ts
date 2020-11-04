import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const routes = Router();

const appointments: { provider: string; date: Date; id: string; }[] = [];

routes.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const id = uuid();
  const appointmentInSameDate = appointments.find(appointment => isEqual(appointment.date, parsedDate));

  if(appointmentInSameDate) {
    return res.status(400).json({ msg: 'Error: Appointment already booked' })
  }

  const appointment = {
    provider,
    date: parsedDate,
    id
  }
  appointments.push(appointment);
  res.status(201).json(appointment);
})

export default routes;
