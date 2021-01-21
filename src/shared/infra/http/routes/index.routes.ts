import { Router } from 'express';
import appointments from '@modules/appointment/infra/http/appointments.routes';
import users from '@modules/user/infra/http/users.routes';
import sessions from '@modules/user/infra/http/sessions.routes';
import password from '@modules/user/infra/http/password.routes';
import profile from '@modules/user/infra/http/profile.routes';
import providers from '@modules/appointment/infra/http/providers.routes';

const routes = Router();

routes.use('/appointments', appointments);
routes.use('/users', users);
routes.use('/sessions', sessions);
routes.use('/password', password);
routes.use('/profile', profile);
routes.use('/providers', providers);

export default routes;
