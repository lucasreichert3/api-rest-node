import express from 'express';
import EstoqueController from '../controller/EstoqueController';
import DefaultValidator from '../validator/DefaultValidator';
import EstoqueValidator from '../validator/EstoqueValidator';
import Middleware from '../../middleware/middleware';
import AutenticacaoController from '../controller/AutenticacaoController';

const router = express.Router();

router.post(
  '/',
  AutenticacaoController.verifyJWT,
  EstoqueValidator.checkCreateProduto(),
  Middleware.handleValidationError,
  EstoqueController.create
);

router.get(
  '/',
  DefaultValidator.checkLimitAndOrder(),
  Middleware.handleValidationError,
  EstoqueController.getAll
);

router.get(
  '/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  EstoqueController.getOne
);

router.put(
  '/:id',
  AutenticacaoController.verifyJWT,
  EstoqueValidator.checkCreateProduto(),
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  EstoqueController.update
);

router.delete(
  '/:id',
  AutenticacaoController.verifyJWT,
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  EstoqueController.delete
);

router.get(
  '/listarProdutos/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  EstoqueController.listarProdutos
);

router.post(
  '/filtrarPorNome',
  AutenticacaoController.verifyJWT,
  EstoqueValidator.checkCreateProduto(),
  Middleware.handleValidationError,
  EstoqueController.filtrarPorNome
);

export default router;
