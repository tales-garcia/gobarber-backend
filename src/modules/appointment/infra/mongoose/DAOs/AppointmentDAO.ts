import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import IAppointmentDTO from "@modules/appointment/DTOs/IAppointmentDTO";
import IFindAllInDayFromProviderDTO from "@modules/appointment/DTOs/IFindAllInDayFromProviderDTO";
import IFindAllInMonthFromProviderDTO from "@modules/appointment/DTOs/IFindAllInMonthFromProviderDTO";
import Appointment from "../schemas/appointment"

interface IAppointment extends Assign<Assign<IAppointmentDTO, "_id", string>, "client", any> {}

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
  async findAllInMonthFromProvider({ year, month, providerId }: IFindAllInMonthFromProviderDTO) {
    return this.find({
      providerId,
      date: ({
        $gte: new Date(year, month, 0),
        $lte: new Date(year, month + 1, 0)
      }) as any
    });
  }
  async findAllInDayFromProvider({ year, day, month, providerId }: IFindAllInDayFromProviderDTO) {
    return this.find({
      providerId,
      date: ({
        $gte: new Date(year, month, day),
        $lte: new Date(year, month, day + 1)
      }) as any
    });
  }
  async create(appointment: IAppointment) {
    return await Appointment.create(appointment) as unknown as IAppointment;
  }
};
