const { Sequelize, DataTypes } = require('sequelize');
const SkillModel = require('./skill-model');
const UserModel = require('./user-model');
const sequelize = new Sequelize('mysql::memory:');



const VerificationModel=sequelize.define('Verification',{
    skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:SkillModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    verified_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

await VerificationModel.sync({ force: true });
console.log("The table for the User model was just (re)created!");

module.exports=VerificationModel;