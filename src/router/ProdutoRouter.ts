import express from 'express';
import ProdutoValidator from '../validator/ProdutoValidator';
import DefaultValidator from '../validator/DefaultValidator';
import Middleware from '../../middleware/middleware';
import ProdutoController from '../controller/ProdutoController';

const router = express.Router();

router.post(
  '/create',
  ProdutoValidator.checkCreateProduto(),
  Middleware.handleValidationError,
  ProdutoController.criar
);

router.get(
  '/read',
  DefaultValidator.checkLimitAndOrder(),
  Middleware.handleValidationError,
  ProdutoController.buscar
);

router.get(
  '/read/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  ProdutoController.buscarPeloID
);

router.put(
  '/update/:id',
  DefaultValidator.checkIdParam(),
  ProdutoValidator.checkCreateProduto(),
  Middleware.handleValidationError,
  ProdutoController.atualizar
);

router.delete(
  '/delete/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  ProdutoController.excluir
);

export default router;
