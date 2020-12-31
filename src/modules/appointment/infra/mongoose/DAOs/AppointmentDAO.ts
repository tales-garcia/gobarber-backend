import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import IAppointmentDTO from "@modules/appointment/DTOs/IAppointmentDTO";
import Appointment from "../entities/appointment"

interface IAppointment extends IAppointmentDTO {
  _id: string
}

export default class AppointmentDAO implements IAppointmentDAO {
  async findByDate(date: Date) {
    return await Appointment.findOne({ date }) as unknown as IAppointment;
  }
  async findOne(filter: OptionalKeys<IAppointment>) {
    return await Appointment.findOne(filter) as unknown as IAppointment;
  }
  async find(filter?: OptionalKeys<IAppointment>) {
    return await Appointment.find(filter) as unknown as IAppointment[];
  }
  async create(appointment: IAppointment) {
    return await Appointment.create(appointment) as unknown as IAppointment;
  }
};
