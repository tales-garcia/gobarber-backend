import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfileController from './controllers/ProfileController';
import authentication from './middlewares/authentication';

const routes = Router();

routes.use(authentication);

routes.patch('/', celebrate({
  [Segments.BODY]: {
    name: Joi.string(),
    email: Joi.string().email(),
    oldPassword: Joi.string(),
    password: Joi.string(),
    passwordConfirmation: Joi.string().valid(Joi.ref('password'))
  }
}), ProfileController.update);
routes.get('/', ProfileController.show);

export default routes;
