import mongoose, { ConnectionOptions } from 'mongoose';

mongoose.connect(`mongodb://${process.env.NODE_ENV === 'prod' ? 'mongo' : 'localhost'}:27017/gobarber`, { useMongoClient: true } as ConnectionOptions);
require('mongoose').Promise = global.Promise;

export default mongoose;
