import mongoose from "@shared/infra/database";

export default interface IAppointmentDAO {
  findByDate(date: Date): Promise<mongoose.Document>;
}
