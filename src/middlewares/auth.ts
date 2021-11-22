import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { auth } from '../../config/auth';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).send({ error: 'Token não fornecido' });

  const parts = authorization.split(' ');

  if (!(parts.length === 2))
    return res.status(401).send({ error: 'Token inválido' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token inválido' });

  verify(token, auth.API_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido' });

    const { id } = decoded as { id: string };

    req.userId = id;

    return next();
  });
}
