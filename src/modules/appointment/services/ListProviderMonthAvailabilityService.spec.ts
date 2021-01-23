import 'reflect-metadata';
import AppointmentDAOMock from '../DAOs/mocks/AppointmentDAOMock';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let appointmentDao: AppointmentDAOMock;
let service: ListProviderMonthAvailabilityService;

describe('List the month availability', () => {
  beforeEach(() => {
    appointmentDao = new AppointmentDAOMock();
    service = new ListProviderMonthAvailabilityService(
      appointmentDao,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 3, 20, 8, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 20, 8, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 20, 10, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 21, 8, 0, 0)
    });

    const availability = await service.execute({
      providerId: 'user',
      year: 2021,
      month: 5
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true }
      ])
    );
  });
});
