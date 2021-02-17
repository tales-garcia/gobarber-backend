import mongoose from 'mongoose';

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/gobarber?authMechanism=SCRAM-SHA-1`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
require('mongoose').Promise = global.Promise;

export default mongoose;
