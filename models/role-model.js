const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');



const RoleModel=sequelize.define('Role',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }	
},{
    sequelize,
    modelName: 'Role',
    tableName:'role',
    
});



module.exports=RoleModel;