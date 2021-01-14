const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');


const EventModel=sequelize.define('Event',{
    id: {
        type: DataTypes.INTEGER,
        autoincrement: true,
        allowNull: false
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

await Event.sync({ force: true });
console.log("The table for the User model was just (re)created!");

module.exports=EventModel;