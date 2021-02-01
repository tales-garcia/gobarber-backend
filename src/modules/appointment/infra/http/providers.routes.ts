import { Router } from 'express';
import ProvidersController from './controllers/ProvidersController';
import DayAvailabilityController from './controllers/DayAvailabilityController';
import MonthAvailabilityController from './controllers/MonthAvailabilityController';
import authentication from '@modules/user/infra/http/middlewares/authentication';
import { celebrate, Joi, Segments } from 'celebrate';

const routes = Router();

routes.use(authentication);

routes.get('/', ProvidersController.index);
routes.get('/:id/availability/month', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), MonthAvailabilityController.index);
routes.get('/:id/availability/day', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}), DayAvailabilityController.index);

export default routes;
