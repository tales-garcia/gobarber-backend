import { Router } from 'express';
import AppointmentController from '../../controllers/AppointmentController';
import authentication from '@modules/user/infra/http/middlewares/authentication';
import AppointmentDAO from '../mongoose/DAOs/AppointmentDAO';

const routes = Router();

routes.use(authentication);

const appointmentControlller = new AppointmentController(new AppointmentDAO());

routes.post('/', appointmentControlller.create);
routes.get('/', appointmentControlller.index);

export default routes;
