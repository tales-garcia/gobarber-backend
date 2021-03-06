import { Router } from 'express';
import AppointmentController from './controllers/AppointmentController';
import ProviderAppointmentsController from './controllers/ProviderAppointmentsController';
import authentication from '@modules/user/infra/http/middlewares/authentication';
import { celebrate, Joi, Segments } from 'celebrate';

const routes = Router();

routes.use(authentication);

routes.post('/', celebrate({
  [Segments.BODY]: {
    providerId: Joi.string().required(),
    date: Joi.string().isoDate().required()
  }
}), AppointmentController.create);
routes.get('/', AppointmentController.index);
routes.get('/me', ProviderAppointmentsController.index);

export default routes;
