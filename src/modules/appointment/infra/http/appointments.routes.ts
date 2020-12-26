import { Router } from 'express';
import AppointmentControlller from '../../controllers/AppointmentController';
import authentication from '@modules/user/infra/http/middlewares/authentication';

const routes = Router();

routes.use(authentication);

routes.post('/', AppointmentControlller.create);
routes.get('/', AppointmentControlller.index);

export default routes;