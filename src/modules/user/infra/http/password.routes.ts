import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';

const routes = Router();

routes.post('/forgot', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required()
  }
}), ForgotPasswordController.create);
routes.post('/reset', celebrate({
  [Segments.BODY]: {
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.string().valid(Joi.ref('password')).required()
  }
}), ResetPasswordController.create);

export default routes;
