const { Sequelize, DataTypes,Deferrable } = require('sequelize');
const SkillModel = require('./skill-model');
const UserModel = require('./user-model');
const sequelize = new Sequelize('mysql::memory:');



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
    modelName: 'Validation',
    tableName:'validation',
    
});



module.exports=ValidationModel;