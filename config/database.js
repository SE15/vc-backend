const config = require('./config');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql'
  });


module.exports=sequelize;