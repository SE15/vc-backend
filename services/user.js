const Sequelize= require('sequelize');
const bcrypt = require("bcrypt");
const UserModel=require('../models/user-model');
const EventModel=require('../models/event-model');
const SkillModel=require('../models/skill-model');
const ConnectionModel=require('../models/connection-model');
const ReccomendationModel=require('../models/recommendation-model');
const MembershipModel=require('../models/membership-model');
const sequelize=require('../config/database');
const { raw } = require('express');
const { or } = require('sequelize');
const {Op} = require("sequelize");

class User{
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
    async addUser(first_name,last_name,email,password,profile_pic){
    const newUser= await UserModel.create({
        first_name: `${first_name}`,
        last_name:`${last_name}`,
        email: `${email}`,
        password: `${password}`,
        profile_pic: `${profile_pic}`

    });
}

async getAllUsers(){
    try{   
        const users=UserModel.findAll({
        attributes:['first_name','last_name','email','profile_pic'], raw: true

        })

        return users;

    }catch(error){
        console.log(`Error : ${error}`);
    }      
}


async searchUser(name){
    try{
  
        const user=UserModel.findAll({
            attributes:['first_name','last_name','profile_pic'], raw: true,
            where:{
                [Op.or]:[{first_name: `${name}`},{last_name: `${name}`}]
                    
            }
    
        });
        return user;
    }catch(error){
        console.log(`Error : ${error}`);
    }

}

    async deleteAccount(email){
    await UserModel.destroy({
        where:{
            email: `${email}`
        }
    });
}

    async changePassword(username,password){
    
    pass= bcrypt.hash(password, bcrypt.genSaltSync(8));
    
    await UserModel.update({password: `${password}`},{
        where:{
            username: 'username'
        }
    })
}

    async editAccount(username,name="",profile_pic=""){
    if (name.length>0 && profile_pic.length>0){
        await UserModel.update({ name: `${name}` , profile_pic:`${profile_pic}`}, {
            where: {
              username: `${username}`
            }
          })
    }else if(name.length>0){
        await UserModel.update({ name: `${name}`}, {
            where: {
              username: `${username}`
            }
          })
    }else if(profile_pic.length>0){
        await UserModel.update({profile_pic:`${profile_pic}`}, {
            where: {
              username: `${username}`
            }
          })
    }
    }

    async addEvent(name,location,start_date,end_date){
    const newEvent= await EventModel.create({
        name: `${name}`,
        location: `${location}`,
        start_date: `${start_date}`,
        end_date: `${end_date}`,
        state:'created'

    });
    return newEvent;
    }

    async getAllEvents(){
    const events=EventModel.findAll({
        attributes:['name','location','start_date','end_date','state'],raw:true
    });

    return events;
    }

    async searchEvent(name){

    const event=EventModel.findAll({
        attributes:['name','location','start_date','end_date','state'],raw:true,
        where:sequelize.or(
            {name:[ `${name}`]},
            {location:[ `${name}`]}
        )
    });
    return event;

    }

    async deleteEvent(id){
    await EventModel.destroy({
        where:{
            id: `${id}`
        }
    });
    }


    async changeState(newState){
    await EventModel.update({state: `${newState}`},{
        where:{
            id: `${id}`
            
        }
    });
    }

    async updateEvent(name="",start_date="",end_date=""){
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

user1=new User();
user1.searchEvent().then(user1=>console.log(user1));

