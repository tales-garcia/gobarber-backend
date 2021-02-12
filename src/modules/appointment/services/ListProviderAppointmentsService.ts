import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import IUserDAO from "@modules/user/DAOs/IUserDAO";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
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
    private appointmentDao: IAppointmentDAO,
    @inject('UserDAO')
    private userDao: IUserDAO,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ providerId, year, month, day }: Request): Promise<Assign<IAppointmentDTO, "_id", string>[]> {
    const cache = await this.cacheProvider.recover(`provider-appointments:${providerId}-${year}-${month}-${day}`);

    if (cache) return cache;

    const appointments = await this.appointmentDao.findAllInDayFromProvider({
      providerId,
      day,
      month: month,
      year
    });

    for (let i = 0; i < appointments.length; i++) {
      const realAppointment = {
        _id: appointments[i]._id,
        date: appointments[i].date,
        providerId: appointments[i].providerId,
        clientId: appointments[i].clientId
      }

      appointments[i] = {
        ...realAppointment,
        client: await this.userDao.findById(appointments[i].clientId)
      };
    }

    await this.cacheProvider.save(`provider-appointments:${providerId}-${year}-${month}-${day}`, appointments);

    return appointments;
  }
}
