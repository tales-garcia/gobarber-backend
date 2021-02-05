import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
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
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ providerId, year, month, day }: Request): Promise<Assign<IAppointmentDTO, "_id", string>[]> {
    const cache = await this.cacheProvider.recover(`provider-appointments:${providerId}`);

    if (cache) return cache;

    const appointments = await this.appointmentDao.findAllInDayFromProvider({
      providerId,
      day,
      month,
      year
    });

    await this.cacheProvider.save(`provider-appointments:${providerId}`, appointments);

    return appointments;
  }
}
