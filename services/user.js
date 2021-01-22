const Sequelize= require('sequelize');
const bcrypt = require("bcrypt");
const UserModel=require('../models/user-model');
const SkillModel=require('../models/skill-model');
const ConnectionModel=require('../models/connection-model');
const RecommendationModel=require('../models/recommendation-model');
const sequelize=require('../config/database');
const { raw } = require('express');
const { or } = require('sequelize');
const {Op} = require("sequelize");
const Connection = require('./user/connection.js');
const Skill = require('./user/skill');
const Recommendation = require('./user/recommendation');
const md5 = require('md5');

class User{
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    static async createUser(id) {
        //gets the information from the database
        let userInfo = await UserModel.findOne({where: {id: id}});
        return new User(userInfo);
    }


    

    async getAllUsers(){
      
        const users=UserModel.findAll({
        attributes:['first_name','last_name','email','profile_pic'], raw: true
        })

        return users;
          
    }


    async searchUser(name){
    
        const user=UserModel.findAll({
            attributes:['first_name','last_name','profile_pic'], raw: true,
            where:{
                [Op.or]:[{first_name: `${name}`,is_deleted:0},{last_name: `${name}`, is_deleted:0}]
                    
            }
        });
        return user;
    
    }

    async deleteAccount(){

        //temp data
        this.user_id = 18;
        let deleteUser=await UserModel.update({ 
                    
            is_deleted: 1},{
                where: {
                    [Op.and]: [
                    {id: this.user_id},
                    {is_deleted:0}
                    ]     
        }});

        console.log(typeof(deleteUser));

        if (deleteUser==true){
            return true;   
        }else{
            return false;
        }
             
    }

    async changePassword(oldPassword,newPassword){
        //temp data
        this.user_id=16;
        
        let result = await UserModel.findOne({where: {id: this.user_id}});
        let hashPassword = result.password;
        let updatePassword = md5(newPassword);
        if(hashPassword === md5(oldPassword)){
            await UserModel.update({ 
                    
                password: updatePassword},{
                    where: {
                        [Op.and]: [
                        {id: this.user_id},
                        {is_deleted:0}
                        ]     
            }});
            return true;        

        }else{
            //console.log('Password does not match');
            return false;
        }
    
    }

     //method for all the attributes not passes when editing profile 
     async editProfile(details){
        let user_id=2;
        var first_name=details[0].first_name;
        var last_name=details[0].last_name;
        var profile_pic=details[0].profile_pic;
        if (first_name==undefined && last_name==undefined && profile_pic==undefined){
             return false;
        
        }else if(first_name!=undefined && last_name==undefined && profile_pic!=undefined){
            await UserModel.update({ 
                first_name:frist_name , 
                profile_pic:profile_pic}, {
                where: {
                    id:user_id
                }
              })
            return true;

        }else if(first_name!=undefined && last_name!=undefined && profile_pic==undefined){
            await UserModel.update({ 
                first_name:frist_name , 
                last_name:last_name}, {
                where: {
                    id:user_id
                }
              })
            return true;

        }else if(first_name==undefined && last_name!=undefined && profile_pic!=undefined){
            await UserModel.update({  
                last_name:last_name,
                profile_pic:profile_pic}, {
                where: {
                    id:user_id
                }
              })
            return true;

        }else if(first_name==undefined && last_name==undefined && profile_pic!=undefined){
            await UserModel.update({ 
                profile_pic:profile_pic}, {
                where: {
                    id:user_id
                }
              })
            return true;

        }else if(first_name==undefined && last_name==undefined && profile_pic!=undefined){
            await UserModel.update({  
                last_name:last_name}, {
                where: {
                    id:user_id
                }
              })
            return true;

        }else if(first_name==undefined && last_name!=undefined && profile_pic!=undefined){
            await UserModel.update({ 
                first_name:frist_name}, {
                where: {
                    id:user_id
                }
              })
            return true;
            
        }
        }

        /*method for all attributes passes when editing profile
        async editProfile(details){
            let user_id=this.user_id;
            var first_name=details[0].first_name;
            var last_name=details[0].last_name;
            var profile_pic=details[0].profile_pic;
            await UserModel.update({
                    first_name:first_name,  
                    last_name:last_name,
                    profile_pic:profile_pic},{
                    where: {
                        id:user_id
                    }
                  })
            return "successfully Update Details";
        }*/
    
    async addConnection(recipient_id) {
        //temp data
        
        this.requester_id = 6;
        let reque_id=this.requester_id;
        let checkin=null;
            
        checkin = await Connection.checkValidations(recipient_id,reque_id);
                  
        try{   
        if(checkin===true){
                    
            let connection = new Connection({requester_id: this.requester_id, recipient_id: recipient_id});
            return await connection.saveToDatabase(true);
            
            //return connection;
       
        }else{
            return "Already exists";
        }
        }catch(e){
            return "Something went wrong";
        }
    }

    async  removeConnection(recipient_id) {
        //temp data
        this.requester_id = 2;
        let reque_id=this.requester_id;
            
        let connection = await Connection.create(recipient_id,reque_id);
        return await connection.destroy();
        
    }

    async  respondConnection(recipient_id,accept){

        this.requester_id = 2;
        let reque_id=this.requester_id;
        let res = null;
    
        
        res = await Connection.updateState(recipient_id,reque_id,accept);
        return res;
    
    }

    async validateSkill(id) {
        //temp values
        this.user_id = 10;

        let skill = await Skill.create(id);
        return await skill.incrementValidations(this.user_id);
        
    }

    async addSkill(name) {
        //temp data
        this.user_id = 2;
    
        let skill = new Skill({user_id: this.user_id, name: name});
        return await skill.saveToDatabase(true);
        //return skill;
        
    }

    async removeSkill(id) {
        //temp data
        //this.user_id = 1;
        id=`${id}`
    
        let skill = await Skill.create(id);
        return await skill.destroy();
        
    }

    async submitRecommendation(user_id,description) {
        //temp data
        this.recommended_by = 11;
        let recommended_by= this.recommended_by
        let check_validation=null;
    
        check_validation = await Recommendation.checkValidations(user_id,recommended_by);
    
        if (check_validation){
            
            let recommendation = new Recommendation({user_id: user_id, recommended_by: this.recommended_by,description:description});
            return await recommendation.saveToDatabase();
            //return recommendation;
        }else{
            return "Already Recommended";
        }   
        
    }
    
    async showRecommendation(user_id) {
        //temp data
    
        let recommendation = new Recommendation({user_id:user_id});
        return await recommendation.getInformation();
            
        
    }

    async viewProfile(user_id){
       
        const user=await UserModel.findAll({
            attributes:['first_name','last_name','profile_pic'], raw: true,
            where:{[Op.and]:
                [{id:`${user_id}`,is_deleted:0}]
                    
            }
    
            });
       
        const records= await RecommendationModel.findAll({
            attributes:['Recommended_by','description'], raw: true,
            where:
                [{user_id:`${user_id}`}]
        });
    
        const skills=await SkillModel.findAll({
            attributes:['name','validations'], raw: true,
            where:
                [{user_id:`${user_id}`}]
        })
        //return records;
        //return user;
        //return mergeduser;
        return [
            user,
            records,
            skills
        ]
    }


    
}

user1=new User();
//user1.addConnection(11).then(result => console.log('Connection Added: ', result));
//user1.removeConnection(11).then(result => console.log('Connection Removed: ', result));
//user1.respondConnection(10,false).then(result => console.log('Connection state updated: ', result));

//user1.validateSkill(4).then(result => console.log('Skill Validated:', result));
//user1.addSkill('node hh').then(result => console.log('Skill Added: ', result));
//user1.removeSkill(60).then(result => console.log('Skill Removed: ', result));

//user1.submitRecommendation(1,'recommnded').then(result => console.log('Recommendation Added: ', result));
//user1.showRecommendation(1).then(result=>console.log('Recommendation Records: ',result));
//user1.viewProfile(1).then(result=>console.log('Profile: ', result));

//user1.deleteAccount().then(result => console.log('Account Deleted: ', result));
//user1.changePassword("543","123").then(result => console.log('Password Changed: ', result));;
//user1.addUser("Chamara", "Weerasinghe","chamara@gmail.com","kk");
//user1.viewEvent(1).then(result=>console.log("Event Details: ",result));
//user1.viewEvent(1).then(result=>console.log("Event Details: ",result));

//user1.searchUser("Lahiru").then(result=>console.log("Search Details: ",result));
