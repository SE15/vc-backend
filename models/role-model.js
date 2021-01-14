const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');



const RoleModel=sequelize.define('Role',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false
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

await RoleModel.sync({ force: true });
console.log("The table for the User model was just (re)created!");

module.exports=RoleModel;