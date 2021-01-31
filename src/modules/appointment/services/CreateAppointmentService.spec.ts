import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import AppointmentDAOMock from "../DAOs/mocks/AppointmentDAOMock";
import CreateAppointmentService from "./CreateAppointmentService";

let service: CreateAppointmentService;
let appointmentDao: AppointmentDAOMock;

describe('Create appointment', () => {
  beforeEach(() => {
    appointmentDao = new AppointmentDAOMock();

    service = new CreateAppointmentService(appointmentDao);
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await new CreateAppointmentService(appointmentDao).execute(
      {
        date: Date(),
        providerId: 'ffff',
        clientId: 'id'
      }
    );

    expect(appointment).toHaveProperty('_id');
    expect(appointment.providerId).toBe('ffff');
  });
  it('should not be able to create an already booked appointment', async () => {
    const date = Date();

    await service.execute(
      {
        date: date,
        providerId: 'ffff',
        clientId: 'id'
      }
    );

    expect(service.execute(
      {
        date: date,
        providerId: 'ffff',
        clientId: 'id'
      }
    )).rejects.toBeInstanceOf(AppError);

  });
});
