import mongoose from 'mongoose';

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/gobarber`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
require('mongoose').Promise = global.Promise;

export default mongoose;
