import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import AppError from "@shared/errors/AppError";
import { parseISO, startOfHour } from "date-fns";
import { inject, injectable } from "tsyringe";

interface Request {
  date: string;
  clientId: string;
  providerId: string;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentDAO')
    private appointmentDao: IAppointmentDAO
  ) { }

  public async execute({ providerId, date, clientId }: Request) {
    const parsedDate = startOfHour(parseISO(date));

    const appointmentInSameDate = await this.appointmentDao.findByDate(parsedDate);

    if (appointmentInSameDate) {
      throw new AppError('Error: Appointment already booked', 400);
    }

    const appointment = await this.appointmentDao.create({
      providerId,
      clientId,
      date: parsedDate
    });

    return appointment;
  }
}
