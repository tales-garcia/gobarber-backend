import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import { inject, injectable } from "tsyringe";
import IAppointmentDTO from "../DTOs/IAppointmentDTO";

interface Request {
  providerId: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
export default class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentDAO')
    private appointmentDao: IAppointmentDAO
  ) { }

  public async execute({ providerId, year, month, day }: Request): Promise<Assign<IAppointmentDTO, "_id", string>[]> {
    return await this.appointmentDao.findAllInDayFromProvider({
      providerId,
      day,
      month,
      year
    });
  }
}
