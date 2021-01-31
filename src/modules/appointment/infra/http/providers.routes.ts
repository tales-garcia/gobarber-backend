import { Router } from 'express';
import ProvidersController from './controllers/ProvidersController';
import DayAvailabilityController from './controllers/DayAvailabilityController';
import MonthAvailabilityController from './controllers/MonthAvailabilityController';
import authentication from '@modules/user/infra/http/middlewares/authentication';

const routes = Router();

routes.use(authentication);

routes.get('/', ProvidersController.index);
routes.get('/:id/availability/month', MonthAvailabilityController.index);
routes.get('/:id/availability/day', DayAvailabilityController.index);

export default routes;
