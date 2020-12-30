import IAppointmentDAO from "@modules/appointment/DAOs/IAppointmentDAO";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListAppointmentsService {
  constructor(
    @inject('AppointmentDAO')
    private appointmentDao: IAppointmentDAO
  ) { }

  public async execute() {
    return await this.appointmentDao.find();
  }
}
