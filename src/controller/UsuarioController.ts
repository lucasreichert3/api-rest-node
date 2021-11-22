import { UsuarioModel } from '../model/UsuarioModel';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';

class UsuarioController {
  async findAll(req: Request, res: Response) {
    try {
      const usuarios = await UsuarioModel.findAll();

      const data = usuarios.map((u) => {
        const usuario = u.get();

        return { ...usuario, password: undefined };
      });

      return res.json({ usuarios: data });
    } catch (error) {
      return res.status(500).json({
        msg: 'Falha ao listar usuarios!',
        status: 500,
        route: '/usuario',
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usuario = await UsuarioModel.findOne({ where: { id } });

      if (!usuario)
        return res.status(404).send({ message: 'Usuário não encontrado!' });

      return res.json({
        usuario: { ...usuario.toJSON(), password: undefined },
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'Falha ao lista usuario!',
        status: 500,
        route: '/usuario',
      });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { password, username } = req.body;

      const usuario = await UsuarioModel.findOne({ where: { username } });

      if (usuario)
        return res
          .status(409)
          .send({ message: 'Já existe um usuário com este username!' });

      const id = uuidv4();
      const hashPassword = await hash(password, 10);

      const record = await UsuarioModel.create({
        ...req.body,
        id,
        password: hashPassword,
      });

      const user = { ...record.toJSON(), password: undefined };

      return res.json({ user, msg: 'Usuario criado com sucesso!' });
    } catch (e) {
      return res.status(500).json({
        msg: 'Falha ao criar usuario!',
        status: 500,
        route: '/usuario',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id !== req.userId) {
        return res
          .status(401)
          .send({ message: 'Usuário não tem permissão de alterar!' });
      }

      const { password, username } = req.body;
      const usuario = await UsuarioModel.findOne({ where: { id } });

      if (!usuario)
        return res.status(404).send({ message: 'Usuário não encontrado!' });

      const duplicate = await UsuarioModel.findOne({ where: { username } });

      if (duplicate && usuario.get().username !== username)
        return res
          .status(409)
          .send({ message: 'Já existe um usuário com este username!' });

      const hashPassword = await hash(password, 10);
      const updated = await usuario.update({
        ...req.body,
        id,
        password: hashPassword,
      });

      return res.json({
        user: { ...updated.toJSON(), password: undefined },
        msg: 'Usuario criado com sucesso!',
      });
    } catch (error) {
      return res.status(500).json({
        msg: 'Falha ao editar usuário!',
        status: 500,
        route: '/usuario',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (id !== req.userId) {
        return res
          .status(401)
          .send({ message: 'Usuário não tem permissão de alterar!' });
      }

      const usuario = await UsuarioModel.findOne({ where: { id } });

      if (!usuario)
        return res.status(404).send({ message: 'Usuário não encontrado!' });

      await usuario.destroy();

      return res.json({ message: 'Usuário excluído!' });
    } catch (error) {
      return res.status(500).json({
        msg: 'Falha ao excluir usuário!',
        status: 500,
        route: '/usuario',
      });
    }
  }
}

export default new UsuarioController();
