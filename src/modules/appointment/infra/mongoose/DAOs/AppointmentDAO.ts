import Appointment from "../entities/appointment"

export default {
  async findOne(filter: object) {
    return await Appointment.findOne(filter);
  },
  async create(appointment: object) {
    return await Appointment.create(appointment);
  },
  async find(filter?: object) {
    return await Appointment.find(filter);
  }
}
