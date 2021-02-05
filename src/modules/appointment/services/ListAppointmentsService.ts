import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListAppointmentsService {
  constructor(
    @inject('AppointmentDAO')
    private appointmentDao: IAppointmentDAO,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute() {
    const cache = await this.cacheProvider.recover(`list-all-appointments`);

    if (cache) return cache;

    const appointments = await this.appointmentDao.find();

    await this.cacheProvider.save(`list-all-appointments`, appointments);

    return appointments;
  }
}
