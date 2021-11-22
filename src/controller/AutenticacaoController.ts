import { compare, hash } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { auth } from '../../config/auth';
import { UsuarioModel } from '../model/UsuarioModel';

class AutenticacaoController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const usuarioModel = await UsuarioModel.findOne({
        where: { username },
      });

      if (!usuarioModel)
        return res.status(400).json({ message: 'Usuário ou senha incorreto!' });

      const samePassword = await compare(password, usuarioModel.get().password);

      if (!samePassword)
        return res.status(400).json({ message: 'Usuário ou senha incorreto!' });

      const usuario = usuarioModel.get();

      const token = sign(
        { id: usuario.id },
        auth.API_SECRET,
        { expiresIn: 86400 }
      );

      return res.json({ usuario: { ...usuario, password: undefined }, token });
    } catch (error) {
      return res.status(500).json({
        msg: 'Falha ao logal!',
        status: 500,
        route: '/login',
      });
    }
  }
}

export default new AutenticacaoController();
