import mongoose from '@shared/infra/database';

const NotificationSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  recipientId: {
    type: String,
    required: true,
    unique: true
  },
  read: {
    type: Boolean,
    required: false,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', NotificationSchema);

export default Notification;
