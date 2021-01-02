import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

export const directory = process.env.NODE_ENV === 'prod' ? path.resolve(__dirname, 'uploads') : path.resolve(__dirname, '..', '..', 'uploads');

export default {
  storage: multer.diskStorage({
    destination: directory,
    filename: (req, file, callback) => {
      const filename = `${req.userId}-${uuid()}-${Date.now().toString()}-${file.originalname}`;

      callback(null, filename);
    }
  })
}
