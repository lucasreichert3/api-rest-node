import express from 'express'
import Middleware from '../../middleware/middleware';
import EstoqueProdutoController from '../controller/EstoqueProdutoController';
import EstoqueProdutoValidator from '../validator/EstoqueProdutoValidator';

const router = express.Router()

router.post(
    '/',
    EstoqueProdutoValidator.checkEstoqueProduto(),
    Middleware.handleValidationError,
    EstoqueProdutoController.adicionar
  )
  
  router.delete(
    '/',
    EstoqueProdutoValidator.checkEstoqueProduto(),
    Middleware.handleValidationError,
    EstoqueProdutoController.deletar
  )

export default router;