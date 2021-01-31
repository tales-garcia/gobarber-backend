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
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => new Date(2021, 4, 21, 11).getTime());

    await expect(service.execute({
      clientId: 'client',
      date: new Date(2021, 4, 21, 10).toISOString(),
      providerId: 'provider'
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => new Date(2021, 4, 21, 11).getTime());

    await expect(service.execute({
      clientId: 'id',
      date: new Date(2021, 4, 21, 13).toISOString(),
      providerId: 'id'
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment before 8am or after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => new Date(2020, 4, 10, 12).getTime());

    await expect(service.execute({
      clientId: 'client-id',
      date: new Date(2020, 4, 11, 7).toISOString(),
      providerId: 'provider-id'
    })).rejects.toBeInstanceOf(AppError);
    await expect(service.execute({
      clientId: 'client-id',
      date: new Date(2020, 4, 11, 18).toISOString(),
      providerId: 'provider-id'
    })).rejects.toBeInstanceOf(AppError);
  });
});
