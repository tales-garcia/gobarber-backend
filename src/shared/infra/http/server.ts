import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes/index.routes';
import cors from 'cors';
import { uploadsFolder } from '@config/upload';
import AppError from '@shared/errors/AppError';
import { errors } from 'celebrate';
import rateLimiter from './routes/middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((e: Error, req: Request, res: Response, _: NextFunction) => {
  if (e instanceof AppError) {
    return res.status(e.statusCode).json({ msg: e.message });
  }

  console.log(e);
  return res.status(500).json({ msg: 'Error: Internal server error', err: e });
});

app.listen(3333, () => console.log('Server started at port 3333!'));
