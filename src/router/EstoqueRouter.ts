import express from 'express';
import EstoqueController from '../controller/EstoqueController';
import DefaultValidator from '../validator/DefaultValidator';
import EstoqueValidator from '../validator/EstoqueValidator';
import Middleware from '../../middleware/middleware';

const router = express.Router();

router.post(
  '/',
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
  EstoqueValidator.checkCreateProduto(),
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  EstoqueController.update
);

router.delete(
  '/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  EstoqueController.delete
);

export default router;
