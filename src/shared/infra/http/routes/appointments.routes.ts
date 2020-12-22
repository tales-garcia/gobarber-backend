import { Router } from 'express';
import AppointmentControlller from '@modules/appointment/controllers/AppointmentController';
import authentication from './middlewares/authentication';

const routes = Router();

routes.use(authentication);

routes.post('/', AppointmentControlller.create);
routes.get('/', AppointmentControlller.index);

export default routes;
