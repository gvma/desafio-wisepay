import { Sequelize } from 'sequelize';
require('dotenv').config();

let sequelizeConnection: any;

if (process.env.ENVIRONMENT === 'dev') {
	const dbName = process.env.DB_NAME_DEV!;
	const dbHost = process.env.DB_HOST_DEV!;
	const dbUser = process.env.DB_USER_DEV!;
	const dbPassword = process.env.DB_PASS_DEV!;
	sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
		host: dbHost,
		dialect: 'postgres'
	})
} else if (process.env.ENVIRONMENT === 'test') {
	const dbName = 'dannneetvn6vrd';
	const dbHost = 'ec2-52-72-99-110.compute-1.amazonaws.com';
	const dbUser = 'hoowrqwrbqcfci';
	const dbPassword = '17c3d91644cb7ac127e7931b38c5df78eeb3fac75e1f73b919bcd56a5214eef6';
	sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
		host: dbHost,
		dialect: 'postgres'
	})
}

export default sequelizeConnection