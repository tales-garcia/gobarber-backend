import { Router } from 'express';
import AuthController from '../../../../modules/user/controllers/AuthController';

const routes = Router();

routes.post('/', AuthController.login);

export default routes;
