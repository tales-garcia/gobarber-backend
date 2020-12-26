import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import Appointment from "../entities/appointment"

export default class AppointmentDAO implements IAppointmentDAO {
  async findByDate(date: Date) {
    return await Appointment.findOne({ date });
  }
  async findOne(filter: object) {
    return await Appointment.findOne(filter);
  }
  async find(filter?: object) {
    return await Appointment.find(filter);
  }
  async create(appointment: object) {
    return await Appointment.create(appointment);
  }
};
