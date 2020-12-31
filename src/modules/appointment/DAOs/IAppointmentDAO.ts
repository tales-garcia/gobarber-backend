import IAppointmentDTO from "../DTOs/IAppointmentDTO";

export default interface IAppointmentDAO {
  create(appointment: IAppointmentDTO): Promise<IAppointmentDTO>;
  findOne(filter: OptionalKeys<IAppointmentDTO>): Promise<IAppointmentDTO>;
  find(filter?: OptionalKeys<IAppointmentDTO>): Promise<IAppointmentDTO[]>;
  findByDate(date: Date): Promise<IAppointmentDTO>;
}
