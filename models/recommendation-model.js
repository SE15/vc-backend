const { Sequelize, DataTypes,Deferrable } = require('sequelize');
const UserModel = require('./user-model');
const sequelize = new Sequelize('mysql::memory:');


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
    modelName: 'Reccomendation',
    tableName:'reccomendation',
    
});


module.exports=RecommendationModel;