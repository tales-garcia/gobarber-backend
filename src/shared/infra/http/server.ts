import express from 'express';
import routes from './routes/index.routes';
import path from 'path';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/images', express.static(process.env.NODE_ENV === 'prod' ?
  path.resolve(__dirname, '..', '..', '..', '..', 'uploads')
  :
  path.resolve(__dirname, 'uploads')
));
app.use(routes);

app.listen(3333);
