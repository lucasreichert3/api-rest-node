import express from 'express';
import ProdutoValidator from '../validator/ProdutoValidator';
import DefaultValidator from '../validator/DefaultValidator';
import Middleware from '../../middleware/middleware';
import ProdutoController from '../controller/ProdutoController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  verifyToken,
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
  verifyToken,
  DefaultValidator.checkIdParam(),
  ProdutoValidator.checkCreateProduto(),
  Middleware.handleValidationError,
  ProdutoController.atualizar
);

router.delete(
  '/:id',
  verifyToken,
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  ProdutoController.excluir
);

router.get(
  '/listarEstoques/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  ProdutoController.listarEstoques
);

router.post(
  '/filtrarPorValor',
  ProdutoValidator.checkFiltroValor(),
  Middleware.handleValidationError,
  ProdutoController.filtroPorValor
);

export default router;
