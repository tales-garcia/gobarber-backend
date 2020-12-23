import { Router } from 'express';
import appointments from '../../../../modules/appointment/infra/http/appointments.routes';
import users from '../../../../modules/user/infra/http/users.routes';
import sessions from '../../../../modules/user/infra/http/sessions.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);

export default routes;
