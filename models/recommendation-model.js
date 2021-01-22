const { DataTypes,Deferrable } = require('sequelize');
const UserModel = require('./user-model');
const sequelize = require('../config/database');

const RecommendationModel=sequelize.define('Recomendation',{
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE,
            

        }
    },
    recommended_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE,
            

        }
    },
    description:DataTypes.STRING
},{
    sequelize,
    timestamps: false,
    modelName: 'Recommendation',
    tableName:'Recommendation',
});


module.exports=RecommendationModel;