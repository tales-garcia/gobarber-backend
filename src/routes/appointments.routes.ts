import { Router } from 'express';
import AppointmentDao from '../controllers/AppointmentController';

const routes = Router();

routes.post('/', AppointmentDao.create);
routes.get('/', AppointmentDao.index);

export default routes;
