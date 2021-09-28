import { body } from 'express-validator';

class EstoqueValidator {
  checkCreateProduto() {
    return [
      body('nome')
        .notEmpty()
        .withMessage('O nome do estoque deve ser fornecido!'),
    ];
  }
}

export default new EstoqueValidator();
