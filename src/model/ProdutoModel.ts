import { DataTypes, Model } from 'sequelize';
import db from '../database/database.config';
import { EstoqueModel } from './EstoqueModel';

interface Produto {
  id: string;
  nome: string;
  quantidade: Int32Array;
  valor: Float32Array;
}

export interface ProdutoParams extends Produto {
  EstoqueModels: EstoqueModel[]
}

export class ProdutoModel extends Model<Produto> {}

ProdutoModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'produto',
  }
);
