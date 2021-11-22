import { body } from 'express-validator';

class UsuarioValidator {
  checkCreateUsuario() {
    return [
      body('username')
        .notEmpty()
        .withMessage('O username do usuário deve ser fornecido'),
      body('password')
        .notEmpty()
        .withMessage('A senha do usuário deve ser fornecido'),
    ];
  }
}

export default new UsuarioValidator();
