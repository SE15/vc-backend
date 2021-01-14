const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user-model');
const sequelize = new Sequelize('mysql::memory:');


const SkillModel=sequelize.define('Skill',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoincrement: true
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

await SkillModel.sync({ force: true });
console.log("The table for the User model was just (re)created!");

module.exports=SkillModel;