import express from 'express';
import EstoqueController from '../controller/EstoqueController';
import DefaultValidator from '../validator/DefaultValidator';
import EstoqueValidator from '../validator/EstoqueValidator';
import Middleware from '../../middleware/middleware';

const router = express.Router();

router.post(
  '/create',
  EstoqueValidator.checkCreateProduto(),
  Middleware.handleValidationError,
  EstoqueController.create
);

router.get(
  '/read',
  DefaultValidator.checkLimitAndOrder(),
  Middleware.handleValidationError,
  EstoqueController.getAll
);

router.get(
  '/read/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  EstoqueController.getOne
);

router.put(
  '/update/:id',
  EstoqueValidator.checkCreateProduto(),
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  EstoqueController.update
);

router.delete(
  '/delete/:id',
  DefaultValidator.checkIdParam(),
  Middleware.handleValidationError,
  EstoqueController.delete
);

export default router;
