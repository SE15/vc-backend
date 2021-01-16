const { DataTypes, Deferrable } = require('sequelize');
const UserModel = require('./user-model');
const SkillModel = require('./skill-model');
const sequelize = require('../config/database');

const ValidationModel=sequelize.define('validation',{
    skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        references:{
            model:SkillModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    validated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey:true,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    }	
},{
    sequelize,
    timestamps: false,
    modelName: 'Validation',
    tableName:'Validation', 
});

module.exports=ValidationModel;