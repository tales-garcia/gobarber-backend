import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import IAppointmentDTO from "@modules/appointment/DTOs/IAppointmentDTO";
import Appointment from "../entities/appointment"

export default class AppointmentDAO implements IAppointmentDAO {
  async findByDate(date: Date) {
    return await Appointment.findOne({ date }) as unknown as IAppointmentDTO;
  }
  async findOne(filter: object) {
    return await Appointment.findOne(filter) as unknown as IAppointmentDTO;
  }
  async find(filter?: object) {
    return await Appointment.find(filter) as unknown as IAppointmentDTO[];
  }
  async create(appointment: IAppointmentDTO) {
    return await Appointment.create(appointment) as unknown as IAppointmentDTO;
  }
};
