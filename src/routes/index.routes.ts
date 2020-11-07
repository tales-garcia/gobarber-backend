import { Router } from 'express';
import appointments from './appointments.routes';
import users from './users.routes';
import sessions from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
