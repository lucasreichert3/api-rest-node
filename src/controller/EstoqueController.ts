import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { EstoqueModel } from '../model/EstoqueModel';

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
}

export default new EstoqueController();
