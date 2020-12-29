import { Router } from 'express';
import AppointmentController from './controllers/AppointmentController';
import authentication from '@modules/user/infra/http/middlewares/authentication';

const routes = Router();

routes.use(authentication);

routes.post('/', AppointmentController.create);
routes.get('/', AppointmentController.index);

export default routes;
