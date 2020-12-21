import mongoose from '../../../../../shared/infra/database';

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  providerId: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    default: Date.now
  },
  updatedAt: {
    type: String,
    default: Date.now
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);


export default Appointment;
