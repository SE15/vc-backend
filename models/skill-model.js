const { Sequelize, DataTypes ,Deferrable} = require('sequelize');
const UserModel = require('./user-model');
const sequelize = new Sequelize('mysql::memory:');


const SkillModel=sequelize.define('Skill',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoincrement: true,
        primaryKey:true
    },
    usert_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    name:DataTypes.STRING,
    verifications: DataTypes.INTEGER
},{
    sequelize,
    modelName: 'Skill',
    tableName:'skill',
    
});



module.exports=SkillModel;