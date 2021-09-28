import { Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';
import { ProdutoModel } from '../model/ProdutoModel';

class ProdutoController {
  async criar(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const record = await ProdutoModel.create({ ...req.body, id });
      return res.json({ record, msg: 'Produto criado com sucesso!' });
    } catch (e) {
      return res.status(500).json({
        msg: 'Falha ao criar produto...',
        status: 500,
        route: '/produto/create',
      });
    }
  }

  async buscar(req: Request, res: Response) {
    try {
      const limit = Number(req.query.size) || 10;
      const offset = Number(req.query.page) || 0;

      const records = await ProdutoModel.findAll({
        where: {},
        limit: Number(limit),
        offset: Number(offset),
      });
      return res.json(records);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        msg: 'Falha ao buscar produtos...',
        status: 500,
        route: '/produto/read',
      });
    }
  }

  async buscarPeloID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await ProdutoModel.findOne({ where: { id } });

      if (!record) {
        return res
          .status(404)
          .send({ msg: `Produto com id ${id} não encontrado` });
      }

      if (!record) {
        return res.json(record);
      }

      return res.json(record);
    } catch (e) {
      return res.status(500).json({
        msg: 'Falha ao buscar produto...',
        status: 500,
        route: '/produto/read/:id',
      });
    }
  }
  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await ProdutoModel.findOne({ where: { id } });

      if (!record) {
        return res
          .status(404)
          .send({ msg: `Produto com id ${id} não encontrado` });
      }

      const updatedRecord = await record.update({ ...req.body, id });
      return res.json({ record: updatedRecord });
    } catch (e) {
      return res.status(500).json({
        msg: 'Falha ao buscar produto...',
        status: 500,
        route: '/produto/update/:id',
      });
    }
  }
  async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await ProdutoModel.findOne({ where: { id } });

      if (!record) {
        return res
          .status(404)
          .json({ msg: 'Não foi possível encontrar o produto...' });
      }

      const deletedRecord = await record.destroy();
      return res.json({ record: deletedRecord });
    } catch (e) {
      return res.status(500).json({
        msg: 'Falha ao buscar produto...',
        status: 500,
        route: '/produto/delete/:id',
      });
    }
  }
}

export default new ProdutoController();
