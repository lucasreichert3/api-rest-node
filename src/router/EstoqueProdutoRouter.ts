import express from 'express'
import Middleware from '../../middleware/middleware';
import EstoqueProdutoController from '../controller/EstoqueProdutoController';
import EstoqueProdutoValidator from '../validator/EstoqueProdutoValidator';
import AutenticacaoController from '../controller/AutenticacaoController';

const router = express.Router()

router.post(
    '/',
    AutenticacaoController.verifyJWT,
    EstoqueProdutoValidator.checkEstoqueProduto(),
    Middleware.handleValidationError,
    EstoqueProdutoController.adicionar
  )
  
  router.delete(
    '/',
    AutenticacaoController.verifyJWT,
    EstoqueProdutoValidator.checkEstoqueProduto(),
    Middleware.handleValidationError,
    EstoqueProdutoController.deletar
  )

export default router;