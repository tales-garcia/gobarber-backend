import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import Appointment from "../entities/appointment"

export default class AppointmentDAO extends Appointment implements IAppointmentDAO {
  async findByDate(date: Date) {
    return await Appointment.findOne({ date });
  }
};
