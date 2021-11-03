import { body } from 'express-validator';

class EstoqueProdutoValidator {
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

export default new EstoqueProdutoValidator();
