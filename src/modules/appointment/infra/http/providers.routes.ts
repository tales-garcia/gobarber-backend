import { Router } from 'express';
import ProvidersController from './controllers/ProvidersController';
import authentication from '@modules/user/infra/http/middlewares/authentication';

const routes = Router();

routes.use(authentication);

routes.get('/', ProvidersController.index);

export default routes;
