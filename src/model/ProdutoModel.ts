import { DataTypes, Model } from 'sequelize';
import db from '../database/database.config';

interface Produto {
  id: string;
  nome: string;
  quantidade: Int32Array;
  valor: Float32Array;
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
      allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }
  },
  {
      sequelize: db,
      tableName: 'produto'
  }
);
