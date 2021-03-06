import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '@config/auth';
import User from '../../mongoose/schemas/user';

interface TokenPayload {
  _id: string
}

export default async function authentication(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ msg: 'Error: Failed at authentication: Token not found' });
  }

  const [, token] = auth.split(' ');

  const decoded = jwt.verify(token, authConfig.secret) as TokenPayload;

  if (!decoded) {
    return res.status(401).json({ msg: 'Error: Failed at authentication: Invalid Token' })
  }

  const user = await User.findById(decoded._id);

  if (!user) {
    return res.status(404).json({ msg: 'Error: User not found' })
  }

  req.userId = decoded._id;

  next();

};
