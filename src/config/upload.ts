import multer, { StorageEngine } from 'multer';
import path from 'path';
import { v4 } from 'uuid';

interface IUploadConfig {
  driver: 'disk' | 's3';

  multer: {
    storage: StorageEngine;
  };

  config: {
    disk: {};

    aws: {
      bucket: string;
    };
  };
}

export const tmpFolder = process.env.NODE_ENV === 'prod' ? path.resolve(__dirname, 'tmp') : path.resolve(__dirname, '..', '..', 'tmp');

export const uploadsFolder = process.env.NODE_ENV === 'prod' ? path.resolve(__dirname, 'tmp', 'uploads') : path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  driver: process.env.STORAGE_DRIVER || 'disk',

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (req, file, callback) => {
        const filename = `${req.userId}-${v4()}-${Date.now().toString()}-${file.originalname}`;

        callback(null, filename);
      }
    })
  },

  config: {
    disk: {},
    aws: {
      bucket: 'gobarber'
    }
  }
} as IUploadConfig;
