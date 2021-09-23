import express from 'express';
import ProdutoValidator from '../validator/ProdutoValidator';
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
	ProdutoValidator.checkReadProduto(),
	Middleware.handleValidationError,
	ProdutoController.buscar
);

router.get(
	'/read/:id',
	ProdutoValidator.checkIdParam(),
	Middleware.handleValidationError,
	ProdutoController.buscarPeloID
);

router.put(
	'/update/:id',
	ProdutoValidator.checkIdParam(),
	Middleware.handleValidationError,
	ProdutoController.atualizar
);

router.delete(
	'/delete/:id',
	ProdutoValidator.checkIdParam(),
	Middleware.handleValidationError,
	ProdutoController.excluir
);

export default router;