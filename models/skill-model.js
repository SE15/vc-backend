const { DataTypes ,Deferrable} = require('sequelize');
const UserModel = require('./user-model');
const sequelize = require('../config/database');

const SkillModel=sequelize.define('Skill',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey:true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    name:DataTypes.STRING,
    validations: DataTypes.INTEGER
},{
    sequelize,
    timestamps: false,
    modelName: 'Skill',
    tableName:'Skill',
    
});

module.exports=SkillModel;