import { Router } from 'express';
import AppointmentDao from '../daos/AppointmentController';

const routes = Router();

interface AppointmentInterface {
  provider: string,
  date: Date
}

routes.post('/', AppointmentDao.create)

export default routes;
