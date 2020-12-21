import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

export default {
  storage: multer.diskStorage({
    destination: process.env.NODE_ENV === 'prod' ? path.resolve(__dirname, 'uploads') : path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, callback) => {
      const filename = `${req.userId}-${uuid()}-${Date.now().toString()}-${file.originalname}`;

      callback(null, filename);
    }
  })
}
