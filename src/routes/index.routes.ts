import { Router } from 'express';
import appointments from './appointments.routes';

const routes = Router();

routes.use('/appointments', appointments);

export default routes;
