import { body } from 'express-validator';

class ProdutoValidator {
  checkCreateProduto() {
    return [
      body('nome')
        .notEmpty()
        .withMessage('O nome do produto deve ser fornecido!'),
      body('estoqueId')
        .notEmpty()
        .withMessage('O id do estoque do produto deve ser informado!'),
      body('quantidade')
        .notEmpty()
        .withMessage('A quantidade do produto deve ser fornecida!')
        .isNumeric()
        .withMessage('A quantidade deve ser um número'),
      body('valor')
        .notEmpty()
        .withMessage('O valor do produto deve ser fornecido!')
        .isNumeric()
        .withMessage('O valor deve ser um número'),
    ];
  }
  checkEstoqueProduto() {
    return [
      body('produtoId')
        .notEmpty()
        .withMessage('O id do produto deve ser fornecido!'),
      body('estoqueId')
        .notEmpty()
        .withMessage('O id do estoque deve ser informado!'),
    ];
  }
}

export default new ProdutoValidator();
