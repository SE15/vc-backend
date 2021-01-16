const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EventModel=sequelize.define('Event',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        primaryKey:true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location:{
        type: DataTypes.STRING,
        allowNull: false
    },
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    state:DataTypes.ENUM('created', 'occured', 'deleted', 'closed')	
},{
    sequelize,
    timestamps: false,
    modelName: 'Event',
    tableName:'Event', 
});
module.exports=EventModel;