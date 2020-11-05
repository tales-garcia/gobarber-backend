import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/gobarber', { useMongoClient: true });
mongoose.Promise = global.Promise;

export default mongoose;
