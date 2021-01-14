const EventModel=require('../models/event-model');
class Event extends Model{
    addEvent(name,location,start_date,end_date){
    const newEvent= await EventModel.create({
        name: `${name}`,
        location: `${location}`,
        start_date: `${start_date}`,
        end_date: `${end_date}`,
        state:'created'

    });
    }

    getAllEvents(){
    const events=EventModel.findAll({
        attributes:['name','location','start_date','end_date','state']
    });

    return events;
    }

    searchEvent(name){

    const event=Post.findAll({
        where:{
            name: `${name}`
        }
    });
    return event;

    }

    deleteEvent(id){
    await EventModel.destroy({
        where:{
            id: `${id}`
        }
    });
    }


    changeState(newState){
    await EventModel.update({state: `${newState}`},{
        where:{
            id: `${id}`
            
        }
    });
    }

    updateEvent(name="",start_date="",end_date=""){
    if (name.length>0 && start_date.length>0 && end_date.length>0){
        await EventModel.update({ name: `${name}`, start_date:`${start_date}` , end_date:`${end_date}`}, {
            where: {
              name: `${name}`,
              start_date:`${start_date}`,
              end_date:`${end_date}`
            }
          })
    }if(name.length>0){
        await EventModel.update({ name: `${name}`}, {
            where: {
              name: `${name}`
            }
          })
    }if(start_date.length>0){
        await EventModel.update({start_date:`${start_date}`}, {
            where: {
              start_date: `${start_date}`
            }
          })
    }if(end_date.length>0){
        await EventModel.update({end_date:`${end_date}`}, {
            where: {
              end_date: `${end_date}`
            }
        })
    }    
    }
}