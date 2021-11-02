import { Request, Response } from 'express';
import { FieldMap } from 'sequelize/types';

import { v4 as uuidv4 } from 'uuid';
import { EstoqueModel } from '../model/EstoqueModel';
import { EstoqueProdutoModel } from '../model/EstoqueProduto';
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

  async adicionarEstoque(req: Request, res: Response) {
    try {
      const { estoqueId, produtoId } = req.body;
      const produto = await ProdutoModel.findOne({ where: { id: produtoId } });
      const estoque = await EstoqueModel.findOne({ where: { id: estoqueId } });

      if (!produto || !estoque) {
        const error = !produto ? 'produto' : 'estoque';
        return res
          .status(404)
          .json({ msg: `Não foi possível encontrar o ${error}...` });
      }

      await (<any>produto).addEstoqueModel(estoque);

      return res.json({ produto, estoque });
    } catch (error) {
      return res.status(500).json({
        msg: 'Falha adicionar estoque ao produto...',
        status: 500,
        route: '/produto/addEstoque',
      });
    }
  }

  async deletarEstoque(req: Request, res: Response) {
    try {
      const { estoqueId, produtoId } = req.body;

      const result = await new EstoqueProdutoModel().getOne(
        estoqueId,
        produtoId
      );

      if (result.length === 0) return res.status(404).json({ message: 'Este produto não pertence ao estoque!' })

      EstoqueProdutoModel.destroy({
        where: { EstoqueModelId: estoqueId, ProdutoModelId: produtoId } as any,
      });

      return res.json({ message: 'Produto retirado do estoque!' });
      
    } catch (error) {
      console.log('DEU ERRO', error);
      return res.status(500).json({
        msg: 'Falha adicionar estoque ao produto...',
        status: 500,
        route: '/produto/addEstoque',
      });
    }
  }
}

export default new ProdutoController();
