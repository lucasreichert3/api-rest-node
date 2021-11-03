import { Request, Response } from 'express';
import { EstoqueModel } from '../model/EstoqueModel';
import { EstoqueProdutoModel } from '../model/EstoqueProduto';
import { ProdutoModel } from '../model/ProdutoModel';

class EstoqueProdutoController {
  async adicionar(req: Request, res: Response) {
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
        msg: 'Falha adicionar ligação de estoque e produto.',
        status: 500,
        route: '/estoqueProduto',
      });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { estoqueId, produtoId } = req.body;

      const result = await new EstoqueProdutoModel().getOne(
        estoqueId,
        produtoId
      );

      if (result.length === 0)
        return res
          .status(404)
          .json({ message: 'Este produto não pertence ao estoque!' });

      EstoqueProdutoModel.destroy({
        where: { EstoqueModelId: estoqueId, ProdutoModelId: produtoId } as any,
      });

      return res.json({ message: 'Ligação entre estoque e produto excluída!' });
    } catch (error) {
      return res.status(500).json({
        msg: 'Falha excluir ligação de estoque e produto...',
        status: 500,
        route: '/estoqueProduto',
      });
    }
  }
}

export default new EstoqueProdutoController();
