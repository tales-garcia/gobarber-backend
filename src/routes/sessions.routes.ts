import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const routes = Router();

routes.post('/', AuthController.login);

export default routes;
