import { Router } from 'express';
import UserController from './controllers/UserController';
import authentication from './middlewares/authentication';
import uploadConfig from '@config/upload';
import multer from 'multer';

const routes = Router();

const upload = multer(uploadConfig);

routes.post('/', UserController.create);
routes.get('/', UserController.index);
routes.patch('/avatar', authentication, upload.single('avatar'), UserController.updateAvatar);

export default routes;
