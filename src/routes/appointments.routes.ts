import { Router } from 'express';
import AppointmentControlller from '../controllers/AppointmentController';

const routes = Router();

routes.post('/', AppointmentControlller.create);
routes.get('/', AppointmentControlller.index);

export default routes;
