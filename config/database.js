//import { createPool } from 'mysql';
const { Sequelize } = require('sequelize');
//var pool = createPool({
//    connectionLimit: 10, 
//    host: process.env.DB_HOST,
//    user: process.env.DB_USER,
//    password: process.env.DB_PASS,
//    database: process.env.DB_DB,
//});

//TODO: Convert these config variables to env when deploying
const sequelize = new Sequelize('YDu6zWJ1mT', 'YDu6zWJ1mT',  'r1S3iks9pv', {
    host: 'remotemysql.com',
    port: 3306,
    dialect: 'mysql'
  });

module.exports=sequelize;