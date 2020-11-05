import { Router } from 'express';
import AppointmentDao from '../daos/AppointmentController';

const routes = Router();

routes.post('/', AppointmentDao.create)

export default routes;
