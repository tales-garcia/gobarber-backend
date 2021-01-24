import 'reflect-metadata';
import AppointmentDAOMock from '../DAOs/mocks/AppointmentDAOMock';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let appointmentDao: AppointmentDAOMock;
let service: ListProviderDayAvailabilityService;

describe('List the day availability', () => {
  beforeEach(() => {
    appointmentDao = new AppointmentDAOMock();
    service = new ListProviderDayAvailabilityService(
      appointmentDao,
    );
  });

  it('should be able to list the day availability from provider', async () => {
    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 21, 8, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 21, 9, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 21, 10, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 21, 11, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 21, 12, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 21, 13, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 21, 16, 0, 0)
    });

    await appointmentDao.create({
      providerId: 'user',
      date: new Date(2021, 4, 21, 17, 0, 0)
    });

    const availability = await service.execute({
      providerId: 'user',
      year: 2021,
      month: 5,
      day: 22
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 14, available: true },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: false }
      ])
    );
  });
});
