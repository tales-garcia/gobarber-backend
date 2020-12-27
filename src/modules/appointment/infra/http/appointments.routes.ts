import { Router } from 'express';
import AppointmentController from '../../controllers/AppointmentController';
import authentication from '@modules/user/infra/http/middlewares/authentication';
import AppointmentDAO from '../mongoose/DAOs/AppointmentDAO';

const routes = Router();

routes.use(authentication);

const appointmentController = new AppointmentController(new AppointmentDAO());

routes.post('/', appointmentController.create.bind(appointmentController));
routes.get('/', appointmentController.index.bind(appointmentController));

export default routes;
