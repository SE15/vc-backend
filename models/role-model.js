const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RoleModel=sequelize.define('Role',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }	
},{
    sequelize,
    timestamps: false,
    modelName: 'Role',
    tableName:'role',
});

module.exports=RoleModel;