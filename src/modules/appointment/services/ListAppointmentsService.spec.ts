import 'reflect-metadata';
import AppointmentDAOMock from "../DAOs/mocks/AppointmentDAOMock";
import ListAppointmentsService from "./ListAppointmentsService";

describe('List appointments', () => {
  it('should be able to list appointments', async () => {
    const appointmentDao = new AppointmentDAOMock();

    const appointments = await new ListAppointmentsService(appointmentDao).execute();

    expect(appointments).toStrictEqual([]);
  });
});
