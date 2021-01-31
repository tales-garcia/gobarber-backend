import mongoose from '@shared/infra/database';

const userTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
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

const UserToken = mongoose.model('Users_Token', userTokenSchema, 'users_tokens');

export default UserToken;
