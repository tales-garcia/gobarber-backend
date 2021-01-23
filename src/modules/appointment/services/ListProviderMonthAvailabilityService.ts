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

    console.log(appointments);

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
