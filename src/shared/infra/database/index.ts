import mongoose, { ConnectionOptions } from 'mongoose';

mongoose.connect('mongodb://localhost/gobarber', { useMongoClient: true } as ConnectionOptions);
mongoose.Promise = global.Promise;

export default mongoose;
