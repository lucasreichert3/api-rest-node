import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { EstoqueModel } from '../model/EstoqueModel';
import { ProdutoModel, ProdutoParams } from '../model/ProdutoModel';

class ProdutoController {
  async criar(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const { estoqueId } = req.body;
      const estoque = await EstoqueModel.findOne({ where: { id: estoqueId } });
      if (!estoque)
        return res
          .status(404)
          .send({ msg: `Estoque com id ${estoqueId} não encontrado` });

      const record = await ProdutoModel.create({ ...req.body, id });

      await (<any>record).addEstoqueModel(estoque);

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

  async listarEstoques(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const record = await ProdutoModel.findOne({
        where: { id },
        include: [EstoqueModel],
      });

      if (!record) {
        return res
          .status(404)
          .json({ msg: 'Não foi possível encontrar o produto...' });
      }

      const { EstoqueModels: estoques } = record.toJSON() as ProdutoParams;

      return res.json({ data: estoques });
    } catch (error) {
      return res.status(500).json({
        msg: 'Falha ao buscar estoques do produto',
        status: 500,
        route: '/produto/listarEstoques',
      });
    }
  }

  async filtroPorValor(req: Request, res: Response) {
    try {
      const { valor } = req.body;

      const result = await ProdutoModel.findAll({
        where: { valor: { [Op.gte]: [valor] } as any },
      });

      return res.json({ data: result })

    } catch (error) {
      return res.status(500).json({
        msg: 'Falha ao filtrar o valor',
        status: 500,
        route: '/produto/filtrarValor',
      });
    }
  }
}

export default new ProdutoController();
