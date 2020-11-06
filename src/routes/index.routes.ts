import { Router } from 'express';
import appointments from './appointments.routes';
import users from './users.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);

export default routes;
