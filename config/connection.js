const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_URL);

const URI = process.env.MYSQL_URL || process.env.JAWSDB_URL 


module.exports = sequelize;