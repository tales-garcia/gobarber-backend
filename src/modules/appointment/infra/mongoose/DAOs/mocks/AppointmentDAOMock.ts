import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import IAppointmentDTO from "@modules/appointment/DTOs/IAppointmentDTO";
import { uuid } from "uuidv4";

interface Appointment extends IAppointmentDTO {
  id: string;
}

export default class AppointmentDAOMock implements IAppointmentDAO {
  private appointments: Appointment[] = [];

  async findByDate(date: Date) {
    return this.findOne({ date });
  }
  async findOne(filter: object) {
    return this.appointments.find(appointment => {
      const results = Object.keys(filter).map(key => appointment[key] === filter[key]);

      return !results.some(result => !result);
    });
  }
  async find(filter?: object) {
    return this.appointments.filter(appointment => {
      if(!filter) {
        return true;
      }

      const results = Object.keys(filter).map(key => appointment[key] === filter[key]);

      return !results.some(result => !result);
    });
  }
  async create(appointmentDto: IAppointmentDTO) {
    const appointment: Appointment = appointmentDto as Appointment;

    appointment.id = uuid();

    this.appointments.push(appointment);
    return appointment;
  }
};
