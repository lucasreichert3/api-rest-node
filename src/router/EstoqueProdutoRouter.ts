import express from 'express'
import Middleware from '../../middleware/middleware';
import EstoqueProdutoController from '../controller/EstoqueProdutoController';
import EstoqueProdutoValidator from '../validator/EstoqueProdutoValidator';
import { verifyToken } from '../middlewares/auth';

const router = express.Router()

router.post(
    '/',
    verifyToken,
    EstoqueProdutoValidator.checkEstoqueProduto(),
    Middleware.handleValidationError,
    EstoqueProdutoController.adicionar
  )
  
  router.delete(
    '/',
    verifyToken,
    EstoqueProdutoValidator.checkEstoqueProduto(),
    Middleware.handleValidationError,
    EstoqueProdutoController.deletar
  )

export default router;