import mongoose from "@shared/infra/database";

export default interface IAppointmentDAO {
  create(appointment: object): Promise<mongoose.Document>;
  findOne(filter: object): Promise<mongoose.Document>;
  find(filter?: object): Promise<mongoose.Document[]>;
  findByDate(date: Date): Promise<mongoose.Document>;
}
