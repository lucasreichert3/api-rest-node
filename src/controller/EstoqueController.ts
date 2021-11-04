import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { EstoqueModel, EstoqueParams } from '../model/EstoqueModel';
import { ProdutoModel } from '../model/ProdutoModel';

export class EstoqueController {
  async create(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const record = await EstoqueModel.create({ ...req.body, id });
      return res.json({ record, msg: 'Estoque criado com sucesso!' });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        msg: 'Falha ao criar estoque!',
        status: 500,
        route: '/estoque/create',
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const limit = Number(req.query.size) || 10;
      const offset = Number(req.query.page) || 0;

      const records = await EstoqueModel.findAll({ where: {}, limit, offset });
      return res.json(records);
    } catch (e) {
      return res.status(500).json({
        msg: 'Falha ao buscar estoques!',
        status: 500,
        route: '/estoque/read',
      });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await EstoqueModel.findOne({ where: { id } });

      if (!record) {
        return res
          .status(404)
          .send({ msg: `Estoque com id ${id} não encontrado` });
      }

      return res.json(record);
    } catch (e) {
      return res.status(500).json({
        msg: 'Falha ao buscar estoque!',
        status: 500,
        route: '/estoque/read/:id',
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await EstoqueModel.findOne({ where: { id } });

      if (!record) {
        return res
          .status(404)
          .send({ msg: `Estoque com id ${id} não encontrado` });
      }

      const updatedRecord = await record.update({ ...req.body, id });
      return res.json({ record: updatedRecord });
    } catch (e) {
      return res.status(500).json({
        msg: 'Falha ao atualizar estoque!',
        status: 500,
        route: '/estoque/update/:id',
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await EstoqueModel.findOne({ where: { id } });

      if (!record) {
        return res
          .status(404)
          .send({ msg: `Estoque com id ${id} não encontrado` });
      }

      const deletedRecord = await record.destroy();
      return res.json({ record: deletedRecord });
    } catch (e) {
      return res.status(500).json({
        msg: 'Falha ao excluir estoque!',
        status: 500,
        route: '/estoque/delete/:id',
      });
    }
  }

  async listarProdutos(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const record = await EstoqueModel.findOne({
        where: { id },
        include: [ProdutoModel],
      });

      if (!record) {
        return res
          .status(404)
          .json({ msg: 'Não foi possível encontrar o estoque...' });
      }

      const { ProdutoModels: produtos } = record.toJSON() as EstoqueParams;

      return res.json({ data: produtos });
    } catch (error) {
      return res.status(500).json({
        msg: 'Falha ao buscar produtos do estoque',
        status: 500,
        route: '/estoque/listarProdutos',
      });
    }
  }

  async filtrarPorNome(req: Request, res: Response) {
    try {
      const { nome } = req.body

      const result = await EstoqueModel.findAll({ where: { nome: { [Op.substring]: nome } } })

      return res.json({ data: result })

    } catch (error) {
      return res.status(500).json({
        msg: 'Falha ao filtrar pelo nome',
        status: 500,
        route: '/produto/filtrarNome',
      });
    }
  }

}

export default new EstoqueController();
