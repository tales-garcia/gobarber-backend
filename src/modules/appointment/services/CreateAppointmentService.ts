import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import AppError from "@shared/errors/AppError";
import { isBefore, parseISO, startOfHour } from "date-fns";
import { getHours } from "date-fns/esm";
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

    if (isBefore(parsedDate, Date.now())) {
      throw new AppError('Error: Invalid Date', 405);
    }

    if (providerId === clientId) {
      throw new AppError('Error: Invalid ProviderId', 403);
    }

    if (getHours(parsedDate) < 8 || getHours(parsedDate) > 17) {
      throw new AppError('Error: Invalid hour', 406);
    }

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
