const { Sequelize, DataTypes,Deferrable } = require('sequelize');
const SkillModel = require('./skill-model');
const UserModel = require('./user-model');
const sequelize = new Sequelize('mysql::memory:');



const VerificationModel=sequelize.define('Verification',{
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
    verified_by: {
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
    modelName: 'Verification',
    tableName:'verification',
    
});



module.exports=VerificationModel;