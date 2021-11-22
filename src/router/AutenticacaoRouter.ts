import express from 'express';
import Middleware from '../../middleware/middleware';
import AutenticacaoController from '../controller/AutenticacaoController';
import UsuarioValidator from '../validator/UsuarioValidator';

const router = express.Router();

router.post(
  '/login',
  UsuarioValidator.checkCreateUsuario(),
  Middleware.handleValidationError,
  AutenticacaoController.login
);

export default router;
