import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import AppointmentDAOMock from "../infra/mongoose/DAOs/mocks/AppointmentDAOMock";
import CreateAppointmentService from "./CreateAppointmentService";

describe('Create appointment', () => {
  it('should be able to create a new appointment', async () => {
    const appointmentDao = new AppointmentDAOMock();

    const appointment = await new CreateAppointmentService(appointmentDao).execute(
      {
        date: Date(),
        providerId: 'ffff'
      }
    );

    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('ffff');
  });
  it('should not be able to create an already booked appointment', async () => {
    const appointmentDao = new AppointmentDAOMock();
    const service = new CreateAppointmentService(appointmentDao);
    const date = Date();

    await service.execute(
      {
        date: date,
        providerId: 'ffff'
      }
    );

    expect(service.execute(
      {
        date: date,
        providerId: 'ffff'
      }
    )).rejects.toBeInstanceOf(AppError);

  });
});