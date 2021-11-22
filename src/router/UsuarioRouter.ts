import express from 'express';
import Middleware from '../../middleware/middleware';
import UsuarioController from '../controller/UsuarioController';
import { verifyToken } from '../middlewares/auth';
import DefaultValidator from '../validator/DefaultValidator';
import UsuarioValidator from '../validator/UsuarioValidator';

const router = express.Router();

router.post(
  '/',
  UsuarioValidator.checkCreateUsuario(),
  Middleware.handleValidationError,
  UsuarioController.create
);

router.put(
  '/:id',
  DefaultValidator.checkIdParam(),
  UsuarioValidator.checkCreateUsuario(),
  Middleware.handleValidationError,
  verifyToken,
  UsuarioController.update
);

router.delete(
  '/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  verifyToken,
  UsuarioController.delete
);

router.get('/', UsuarioController.findAll);

router.get(
  '/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  UsuarioController.findOne
);

export default router;
