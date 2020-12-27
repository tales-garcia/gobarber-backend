import { Router } from 'express';
import AppointmentController from './controllers/AppointmentController';
import authentication from '@modules/user/infra/http/middlewares/authentication';
import { container } from 'tsyringe';

const routes = Router();

routes.use(authentication);

const appointmentController = container.resolve(AppointmentController);

routes.post('/', appointmentController.create.bind(appointmentController));
routes.get('/', appointmentController.index.bind(appointmentController));

export default routes;
