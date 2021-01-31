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
      clientId: 'client',
      date: new Date(2021, 4, 20, 14, 0, 0),
    });

    await appointmentDao.create({
      providerId: 'user',
      clientId: 'client',
      date: new Date(2021, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 5, 20, 11).getTime();
    });

    const availability = await service.execute({
      providerId: 'user',
      year: 2021,
      month: 6,
      day: 20
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ])
    );
  });
});
