import mongoose, { ConnectionOptions } from 'mongoose';

mongoose.connect('mongodb://mongo:27017/gobarber', { useMongoClient: true } as ConnectionOptions);
mongoose.Promise = global.Promise;

export default mongoose;
