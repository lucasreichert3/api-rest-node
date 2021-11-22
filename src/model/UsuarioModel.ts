import { DataTypes, Model } from 'sequelize';
import db from '../database/database.config';

interface Usuario {
  id: string;
  username: string;
  password: string;
}

export class UsuarioModel extends Model<Usuario> {}

UsuarioModel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'usuario',
  }
);
