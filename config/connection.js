const Sequelize = require('sequelize');
require('dotenv').config();




let sequelize; 

const URI = process.env.MYSQL_URL || process.env.JAWSDB_URL 

sequelize = new Sequelize(URI)



module.exports = sequelize;


module.exports = sequelize;