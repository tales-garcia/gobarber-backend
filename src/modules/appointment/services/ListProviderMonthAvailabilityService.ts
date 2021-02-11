import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { getDate, getDaysInMonth, isAfter } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentDAO from '../DAOs/IAppointmentDAO';

interface IRequest {
  providerId: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentDAO')
    private appointmentDao: IAppointmentDAO,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    providerId,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    // const cache = await this.cacheProvider.recover(`provider-appointment-month-availability-${providerId}-${year}-${month}`);

    // if (cache) return cache;

    const appointments = await this.appointmentDao.findAllInMonthFromProvider({
      providerId,
      year,
      month: month - 1
    });

    const daysInMonth = Array.from({
      length: getDaysInMonth(new Date(year, month - 1))
    },
      (_, index) => index + 1
    );

    const currentDate = new Date(Date.now());

    const availability = daysInMonth.map(day => {
      const appointmentsInDay = appointments.filter(appointment => getDate(appointment.date) === day);
      const compareDate = new Date(year, month - 1, day, 23, 59, 59);

      return {
        day,
        available: !(appointmentsInDay.length >= 9 || isAfter(currentDate, compareDate))
      };
    });

    await this.cacheProvider.save(`provider-appointment-month-availability-${providerId}-${year}-${month}`, availability);

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
