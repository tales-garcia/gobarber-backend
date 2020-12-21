import mongoose from '../../../../../shared/infra/database';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
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

interface UserData extends mongoose.Document {
  name: string,
  password: string,
  email: string,
}

userSchema.pre<UserData>('save', async function(next) {
  const password = await bcrypt.hash(this.password, 10);

  this.password = password;

  next();
});

const User = mongoose.model('User', userSchema);

export default User;
