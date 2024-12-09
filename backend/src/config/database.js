import { Sequelize } from 'sequelize';

const db = new Sequelize('spear_wallet', 'spear_user', 'password', {
  host: 'localhost',
  dialect: 'postgres', // or 'mysql', 'sqlite', 'mssql', depending on your setup
});

export default db;