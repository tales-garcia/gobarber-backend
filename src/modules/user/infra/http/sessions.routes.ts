import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionsController from './controllers/SessionsController';

const routes = Router();

routes.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }
}), SessionsController.create);

export default routes;
