import { Dialect, Sequelize } from 'sequelize'

const dbName = 'wise-pay-test';
const dbUser = 'postgres';
const dbHost = 'localhost';
const dbPassword = 'postgres';

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres'
})

export default sequelizeConnection