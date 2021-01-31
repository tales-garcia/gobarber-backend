import { getHours, isAfter } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import IAppointmentDAO from '../DAOs/IAppointmentDAO';

interface IRequest {
  providerId: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentDAO')
    private appointmentDao: IAppointmentDAO,
  ) {}

  public async execute({
    providerId,
    year,
    month,
    day
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentDao.findAllInDayFromProvider({
      providerId,
      year,
      month: month - 1,
      day
    });

    const hoursInDay = Array.from({
      length: 10
    },
      (_, index) => index + 8
    );

    const currentDate = new Date(Date.now());

    const availability = hoursInDay.map(hour => {
      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !(appointments.some(appointment => getHours(appointment.date) === hour) || isAfter(currentDate, compareDate))
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
