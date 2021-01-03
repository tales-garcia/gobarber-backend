import multer from 'multer';
import path from 'path';
import { uuid } from 'uuidv4';

export const tmpFolder = process.env.NODE_ENV === 'prod' ? path.resolve(__dirname, 'tmp') : path.resolve(__dirname, '..', '..', 'tmp');

export const uploadsFolder = process.env.NODE_ENV === 'prod' ? path.resolve(__dirname, 'tmp', 'uploads') : path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (req, file, callback) => {
      const filename = `${req.userId}-${uuid()}-${Date.now().toString()}-${file.originalname}`;

      callback(null, filename);
    }
  })
}
