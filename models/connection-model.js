const { DataTypes,Deferrable } = require('sequelize');
const UserModel = require('./user-model');
const sequelize = require('../config/database');


const ConnectionModel=sequelize.define('Connection',{
    requester_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    recipient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    state:DataTypes.ENUM('pending', 'accepted', 'rejected')	
},{
    sequelize,
    timestamps: false,
    modelName: 'Connection',
    tableName:'Connection',
    
});

module.exports=ConnectionModel;