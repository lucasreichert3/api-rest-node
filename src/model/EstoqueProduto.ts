import { Model } from 'sequelize';
import db from '../database/database.config';
import { EstoqueModel } from './EstoqueModel';
import { ProdutoModel } from './ProdutoModel';

export interface EstoqueProduto {}

export interface EstoqueProdutoLigacao {
  EstoqueModelId: number;
  ProdutoModelId: number;
}

export class EstoqueProdutoModel extends Model<EstoqueProduto> {
  async getOne(
    estoqueId: string,
    produtoId: string
  ): Promise<EstoqueProdutoLigacao[]> {
    const [results] = await this.sequelize.query(
      `SELECT * FROM estoque_produtos.\`estoque_produto\` AS \`EstoqueProdutoModel\` where \`EstoqueModelId\` = '${estoqueId}' and \`ProdutoModelId\` = '${produtoId}' LIMIT 1;`
    );

    return results as EstoqueProdutoLigacao[];
  }
}

EstoqueProdutoModel.init(
  {},
  {
    sequelize: db,
    tableName: 'estoque_produto',
  }
);

EstoqueModel.belongsToMany(ProdutoModel, { through: 'estoque_produto' });
ProdutoModel.belongsToMany(EstoqueModel, { through: 'estoque_produto' });
