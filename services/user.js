const Sequelize= require('sequelize');
const bcrypt = require("bcrypt");
const UserModel=require('../models/user-model');
const EventModel=require('../models/event-model');
const SkillModel=require('../models/skill-model');
const ConnectionModel=require('../models/connection-model');
const ReccomendationModel=require('../models/recommendation-model');
const MembershipModel=require('../models/membership-model');

class User{
    addUser(fullname,username,password,profile_pic){
    const newUser= await UserModel.create({
        name: `${fullname}`,
        username: `${username}`,
        password: `${password}`,
        profile_pic: `${profile_pic}`

    });
}

    getAllUsers(){
    const users=UserModel.findAll({
        attributes:['name','username','profile_pic']
    });
    return users;
}

    searchUser(username){

    const user=Post.findAll({
        where:{
            username: `${username}`
        }
    });
    return user;

}

    deleteAccount(username){
    await UserModel.destroy({
        where:{
            username: `${username}`
        }
    });
}

    changePassword(username,password){
    
    pass= bcrypt.hash(password, bcrypt.genSaltSync(8));
    
    await UserModel.update({password: `${password}`},{
        where:{
            username: 'username'
        }
    })
}

    editAccount(username,name="",profile_pic=""){
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
