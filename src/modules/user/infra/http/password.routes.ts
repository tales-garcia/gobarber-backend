import { Router } from 'express';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';

const routes = Router();

routes.post('/forgot', ForgotPasswordController.create);
routes.patch('/reset/:token', ResetPasswordController.create);

export default routes;
