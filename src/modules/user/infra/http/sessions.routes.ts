import { Router } from 'express';
import SessionsController from './controllers/SessionsController';

const routes = Router();

routes.post('/', SessionsController.create);

export default routes;
