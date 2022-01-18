const { Sequelize } = require('sequelize');

require('dotenv').config();

const HOST = process.env.MYSQL_HOST;
const USER = process.env.MYSQL_USER;
const PASSWORD = process.env.MYSQL_PASSWORD;
const DATABASE = process.env.MYSQL_DBNAME;   

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  port: 3306,
  dialect: 'mysql',
});

module.exports = sequelize;