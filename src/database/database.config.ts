import { Sequelize } from 'sequelize';

const db = new Sequelize('estoque_produtos', 'root', '', {
  dialect: 'mysql',
});

export default db;