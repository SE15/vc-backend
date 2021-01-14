const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user-model');
const sequelize = new Sequelize('mysql::memory:');


const ConnectionModel=sequelize.define('Connection',{
    requester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    recipient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    state:DataTypes.ENUM('pending', 'accepted', 'rejected')	
},{
    sequelize,
    modelName: 'Connection',
    tableName:'connection',
    
});

await ConnectionModel.sync({ force: true });
console.log("The table for the User model was just (re)created!");

module.exports=ConnectionModel;