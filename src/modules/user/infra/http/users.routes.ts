import { Router } from 'express';
import UserController from './controllers/UserController';
import authentication from './middlewares/authentication';
import uploadConfig from '@config/upload';
import multer from 'multer';
import { celebrate, Joi, Segments } from 'celebrate';

const routes = Router();

const upload = multer(uploadConfig);

routes.post('/', celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    password: Joi.string().required()
  }
}), UserController.create);
routes.get('/', UserController.index);
routes.patch('/avatar', authentication, upload.single('avatar'), UserController.updateAvatar);

export default routes;
