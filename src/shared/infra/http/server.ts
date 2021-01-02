import 'reflect-metadata';
import '@shared/container';
import express from 'express';
import routes from './routes/index.routes';
import cors from 'cors';
import { directory } from '@config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(directory));
app.use(routes);

app.listen(3333);
