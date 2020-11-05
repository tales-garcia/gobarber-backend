import mongoose from '../database';

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  providerId: {
    type: String,
    required: true
  }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);


export default Appointment;
