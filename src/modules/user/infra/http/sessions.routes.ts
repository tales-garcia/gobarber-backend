import { Router } from 'express';
import { container } from 'tsyringe';
import AuthController from '../../controllers/AuthController';

const routes = Router();

const authController = container.resolve(AuthController);

routes.post('/', authController.login.bind(authController));

export default routes;
