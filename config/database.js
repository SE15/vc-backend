//import { createPool } from 'mysql';
const { Sequelize } = require('sequelize');
//var pool = createPool({
//    connectionLimit: 10, 
//    host: process.env.DB_HOST,
//    user: process.env.DB_USER,
//    password: process.env.DB_PASS,
//    database: process.env.DB_DB,
//});

const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER,  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
module.exports=sequelize;