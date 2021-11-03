import express from 'express';
import ProdutoValidator from '../validator/ProdutoValidator';
import DefaultValidator from '../validator/DefaultValidator';
import Middleware from '../../middleware/middleware';
import ProdutoController from '../controller/ProdutoController';

const router = express.Router();

router.post(
  '/',
  ProdutoValidator.checkCreateProduto(),
  Middleware.handleValidationError,
  ProdutoController.criar
);

router.get(
  '/',
  DefaultValidator.checkLimitAndOrder(),
  Middleware.handleValidationError,
  ProdutoController.buscar
);

router.get(
  '/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  ProdutoController.buscarPeloID
);

router.put(
  '/:id',
  DefaultValidator.checkIdParam(),
  ProdutoValidator.checkCreateProduto(),
  Middleware.handleValidationError,
  ProdutoController.atualizar
);

router.delete(
  '/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  ProdutoController.excluir
);

export default router;
