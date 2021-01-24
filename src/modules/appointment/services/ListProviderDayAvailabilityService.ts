import { getHours } from 'date-fns';
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
      month,
      day
    });

    const hoursInDay = Array.from({
      length: 10
    },
      (_, index) => index + 8
    );

    const availability = hoursInDay.map(hour => {
      return {
        hour,
        available: !appointments.some(appointment => getHours(appointment.date) === hour)
      };
    });

    console.log(availability);

    return availability;
  }
}

export default ListProviderDayAvailabilityService;