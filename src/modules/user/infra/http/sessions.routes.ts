import { Router } from 'express';
import AuthController from '../../controllers/AuthController';
import UserDAO from '../mongoose/DAOs/UserDAO';

const routes = Router();

const authController = new AuthController(new UserDAO());

routes.post('/', authController.login.bind(authController));

export default routes;
