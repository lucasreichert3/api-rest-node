import express from 'express';
import DefaultValidator from '../validator/DefaultValidator';
import Middleware from '../../middleware/middleware';
import AutenticacaoController from '../controller/AutenticacaoController';

const router = express.Router();

router.post(
  '/login/:usuario/:senha',
  Middleware.handleValidationError,
  AutenticacaoController.login
);

router.post(
  '/logout',
  Middleware.handleValidationError,
  AutenticacaoController.logout
);

export default router;
