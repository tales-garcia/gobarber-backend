import { Router } from 'express';
import ProfileController from './controllers/ProfileController';
import authentication from './middlewares/authentication';

const routes = Router();

routes.use(authentication);
routes.patch('/', ProfileController.update);

export default routes;
