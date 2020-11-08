import express from 'express';
import routes from './routes/index.routes';
import path from 'path';

const app = express();

app.use(express.json());
app.use('/images', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen(3333);
