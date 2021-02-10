import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import IAppointmentDTO from "@modules/appointment/DTOs/IAppointmentDTO";
import IFindAllInDayFromProviderDTO from "@modules/appointment/DTOs/IFindAllInDayFromProviderDTO";
import IFindAllInMonthFromProviderDTO from "@modules/appointment/DTOs/IFindAllInMonthFromProviderDTO";
import { getMonth, getYear, getDate } from "date-fns";
import { v4 } from "uuid";

interface Appointment extends Assign<IAppointmentDTO, "_id", string> {}

export default class AppointmentDAOMock implements IAppointmentDAO {
  private appointments: Appointment[] = [];

  async findByDate(date: Date) {
    return this.findOne({ date });
  }
  async findOne(filter: OptionalKeys<Appointment>) {
    return (await this.find()).find(appointment => {
      const results = Object.keys(filter).map(key => appointment[key] === filter[key]);

      return results.some(result => !result);
    });
  }
  async findAllInMonthFromProvider({ year, month, providerId }: IFindAllInMonthFromProviderDTO) {
    return (await this.find())
      .filter(appointment =>
        appointment.providerId === providerId &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month
      );
  }
  async findAllInDayFromProvider({ year, month, providerId, day }: IFindAllInDayFromProviderDTO) {
    return (await this.find())
      .filter(appointment =>
        appointment.providerId === providerId &&
        getYear(appointment.date) === year &&
        getMonth(appointment.date) + 1 === month &&
        getDate(appointment.date) === day
      );
  }
  async find(filter?: OptionalKeys<Appointment>) {
    return this.appointments.filter(appointment => {
      if(!filter) {
        return true;
      }

      const results = Object.keys(filter).map(key => appointment[key] === filter[key]);

      return !results.some(result => result);
    });
  }
  async create(appointmentDto: IAppointmentDTO) {
    const appointment: Appointment = appointmentDto as Appointment;

    appointment._id = v4();

    this.appointments.push(appointment);
    return appointment;
  }
};
