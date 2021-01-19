const EventModel = require('../../models/event-model');
const ValidationModel = require('../../models/validation-model');
const { Op } = require("sequelize");
const sequelize = require('../../config/database');

class Event {
    constructor(info) {
        this.name = info.name;
        this.location = info.location;
        this.start_date = info.start_date;
        this.end_date = info.end_date;
    }

    static async create(id) {
        //gets the information from the database
        let eventInfo = await EventModel.findOne({where: {id: id}});
        return new Event(eventInfo);
    }

    async getInformation(event_id){
        let event =  await EventModel.findAll({
            attributes:['name','location','start_date','end_date'], raw: true,
            where:
                [{id: event_id}]
                    
            
        });
        if(event){
            return event;
        }else{
            return false;
        }
    }
}

module.exports = Event;