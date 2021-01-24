require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER,  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.PORT || 3306,
    
    dialect: 'mysql'
  });

module.exports=sequelize;

