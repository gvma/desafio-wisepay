import { Dialect, Sequelize } from 'sequelize';
require('dotenv').config();

let sequelizeConnection: any;

if (process.env.ENVIRONMENT === 'dev') {
	const dbName: string = process.env.DB_NAME_DEV!;
	const dbHost = process.env.DB_HOST_DEV!;
	const dbUser = process.env.DB_USER_DEV!;
	const dbPassword = process.env.DB_PASS_DEV!;
	sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
		host: dbHost,
		dialect: 'postgres'
	})
} else if (process.env.ENVIRONMENT === 'test') {
	const dbName: string = process.env.DB_NAME_TEST!;
	const dbHost = process.env.DB_HOST_TEST!;
	const dbUser = process.env.DB_USER_TEST!;
	const dbPassword = process.env.DB_PASS_TEST!;
	sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
		host: dbHost,
		dialect: 'postgres'
	})
}

export default sequelizeConnection