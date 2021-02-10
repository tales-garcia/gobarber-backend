import mongoose, { ConnectionOptions } from 'mongoose';

mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/gobarber`, { useMongoClient: true } as ConnectionOptions);
require('mongoose').Promise = global.Promise;

export default mongoose;
