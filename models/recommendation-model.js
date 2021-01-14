const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./user-model');
const sequelize = new Sequelize('mysql::memory:');


const RecommendationModel=sequelize.define('Recomendation',{
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    recommended_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:UserModel,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE

        }
    },
    description:DataTypes.STRING
},{
    sequelize,
    modelName: 'Reccomendation',
    tableName:'reccomendation',
    
});

await RecommendationModel.sync({ force: true });
console.log("The table for the User model was just (re)created!");

module.exports=RecommendationModel;