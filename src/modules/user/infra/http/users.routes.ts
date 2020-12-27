import { Router } from 'express';
import UserController from '../../controllers/UserController';
import authentication from './middlewares/authentication';
import uploadConfig from '@config/upload';
import multer from 'multer';
import UserDAO from '../mongoose/DAOs/UserDAO';

const routes = Router();

const userController = new UserController(new UserDAO());
const upload = multer(uploadConfig);

routes.post('/', userController.create);
routes.get('/', userController.index);
routes.patch('/avatar', authentication, upload.single('avatar'), userController.updateAvatar);

export default routes;
