import { Router } from 'express';
import UserController from '../../controllers/UserController';
import authentication from './middlewares/authentication';
import uploadConfig from '@config/upload';
import multer from 'multer';
import { container } from 'tsyringe';

const routes = Router();

const userController = container.resolve(UserController);
const upload = multer(uploadConfig);

routes.post('/', userController.create.bind(userController));
routes.get('/', userController.index.bind(userController));
routes.patch('/avatar', authentication, upload.single('avatar'), userController.updateAvatar.bind(userController));

export default routes;
