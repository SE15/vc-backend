const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql::memory:');


class Event extends Model{}
Event.init({
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

function addEvent(name,location,start_date,end_date){
    const newEvent= await Event.create({
        name: `${name}`,
        location: `${location}`,
        start_date: `${start_date}`,
        end_date: `${end_date}`,
        state:'created'

    });
}

function getAllEvents(){
    Event.findAll({
        attributes:['name','location','start_date','end_date','state']
    });
}

function searchEvent(name){

    Post.findAll({
        where:{
            name: `${name}`
        }
    });

}

function deleteEvent(id){
    await Event.destroy({
        where:{
            id: `${id}`
        }
    });
}


function changeState(newState){
    await Event.update({state: `${newState}`},{
        where:{
            id: `${id}`
            
        }
    });
}

function updateEvent(name="",start_date="",end_date=""){
    if (name.length>0 && start_date.length>0 && end_date.length>0){
        await User.update({ name: `${name}`, start_date:`${start_date}` , end_date:`${end_date}`}, {
            where: {
              name: `${name}`,
              start_date:`${start_date}`,
              end_date:`${end_date}`
            }
          })
    }if(name.length>0){
        await User.update({ name: `${name}`}, {
            where: {
              name: `${name}`
            }
          })
    }if(start_date.length>0){
        await User.update({start_date:`${start_date}`}, {
            where: {
              start_date: `${start_date}`
            }
          })
    }if(end_date.length>0){
        await User.update({end_date:`${end_date}`}, {
            where: {
              end_date: `${end_date}`
            }
        })
    }    
}