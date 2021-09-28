import { DataTypes, Model } from 'sequelize';
import db from '../database/database.config';

export interface Estoque {
  id: string;
  nome: string;
  descricao?: string;
}

export class EstoqueModel extends Model<Estoque> {}

EstoqueModel.init(
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
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: 'estoque',
  }
);
