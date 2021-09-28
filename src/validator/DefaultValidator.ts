import { body, param, query } from 'express-validator';

class DefaultValidator {
  checkLimitAndOrder() {
    return [
      query('limit')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('O limite deve está entre 1-10'),
      query('offset')
        .optional()
        .isNumeric()
        .withMessage('O valor deve ser um número'),
    ];
  }
  checkIdParam() {
    return [
      param('id')
        .notEmpty()
        .withMessage('O id deve ser fornecido')
    ];
  }
}

export default new DefaultValidator();