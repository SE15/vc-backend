const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');


const EventModel=sequelize.define('Event',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false,
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
    modelName: 'Event',
    tableName:'event',
    
});



module.exports=EventModel;