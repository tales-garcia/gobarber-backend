import IAppointmentDTO from "../DTOs/IAppointmentDTO";

export default interface IAppointmentDAO {
  create(appointment: IAppointmentDTO): Promise<IAppointmentDTO>;
  findOne(filter: object): Promise<IAppointmentDTO>;
  find(filter?: object): Promise<IAppointmentDTO[]>;
  findByDate(date: Date): Promise<IAppointmentDTO>;
}
