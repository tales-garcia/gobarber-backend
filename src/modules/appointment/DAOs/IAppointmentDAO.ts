import IAppointmentDTO from "../DTOs/IAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "../DTOs/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "../DTOs/IFindAllInDayFromProviderDTO";

type IAppointment = Assign<Assign<IAppointmentDTO, "_id", string>, "client", any>;

export default interface IAppointmentDAO {
  create(appointment: IAppointmentDTO): Promise<IAppointment>;
  findOne(filter: OptionalKeys<IAppointmentDTO>): Promise<IAppointment>;
  find(filter?: OptionalKeys<IAppointmentDTO>): Promise<IAppointment[]>;
  findByDate(date: Date): Promise<IAppointment>;
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<IAppointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<IAppointment[]>;
}
