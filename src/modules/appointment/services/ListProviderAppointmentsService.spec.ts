import 'reflect-metadata';
import AppointmentDAOMock from "../DAOs/mocks/AppointmentDAOMock";
import UserDAOMock from "@modules/user/DAOs/mocks/UserDAOMock";
import ListProviderAppointmentsService from "./ListProviderAppointmentsService";

let service: ListProviderAppointmentsService;
let appointmentDao: AppointmentDAOMock;
let userDao: UserDAOMock;

describe('List provider appointments', () => {
  beforeEach(() => {
    appointmentDao = new AppointmentDAOMock();
    userDao = new UserDAOMock();

    service = new ListProviderAppointmentsService(appointmentDao);
  });

  it('should be able to list provider appointments', async () => {
    const appointment1 = await appointmentDao.create({
      providerId: 'user',
      clientId: 'client',
      date: new Date(2021, 4, 20, 14),
    });

    const appointment2 = await appointmentDao.create({
      providerId: 'user',
      clientId: 'client',
      date: new Date(2021, 4, 20, 15),
    });

    const appointments = await service.execute({
      providerId: 'user',
      day: 20,
      year: 2021,
      month: 5
    });

    expect(appointments).toStrictEqual([expect.objectContaining(appointment1), expect.objectContaining(appointment2)]);
  });
});
