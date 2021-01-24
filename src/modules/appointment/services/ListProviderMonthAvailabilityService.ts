import { getDate, getDaysInMonth } from 'date-fns';
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
  ) {}

  public async execute({
    providerId,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentDao.findAllInMonthFromProvider({
      providerId,
      year,
      month
    });

    const daysInMonth = Array.from({
      length: getDaysInMonth(new Date(year, month - 1))
    },
      (_, index) => index + 1
    );

    const availability = daysInMonth.map(day => {
      const appointmentsInDay = appointments.filter(appointment => getDate(appointment.date) === day)

      return {
        day,
        available: appointmentsInDay.length < 10
      };
    });

    console.log(availability);

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;
