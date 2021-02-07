import 'reflect-metadata';
import AppointmentDAOMock from "../DAOs/mocks/AppointmentDAOMock";
import ListAppointmentsService from "./ListAppointmentsService";
import CacheProviderMock from '@shared/container/providers/CacheProvider/mocks/CacheProviderMock';

describe('List appointments', () => {
  it('should be able to list appointments', async () => {
    const cacheProvider = new CacheProviderMock();
    const appointmentDao = new AppointmentDAOMock();

    const appointments = await new ListAppointmentsService(appointmentDao, cacheProvider).execute();

    expect(appointments).toStrictEqual([]);
  });
});
