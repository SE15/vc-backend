const Sequelize= require('sequelize');
const bcrypt = require("bcrypt");
const UserModel=require('../models/user-model');
const SkillModel=require('../models/skill-model');
const ConnectionModel=require('../models/connection-model');
const ReccomendationModel=require('../models/recommendation-model');
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

    static async create(id) {
        //gets the information from the database
        let userInfo = await UserModel.findOne({where: {id: id}});
        return new User(userInfo);
    }


    async addUser(first_name,last_name,email,password){

        let hashPassword = md5(password);
        const newUser= await UserModel.create({
            first_name: `${first_name}`,
            last_name:`${last_name}`,
            email: `${email}`,
            password: `${hashPassword}`,
     
    });
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
                [Op.or]:[{first_name: `${name}`},{last_name: `${name}`}]
                    
            }
        });
        return user;
    
    }

    async deleteAccount(){

        //temp data
        this.user_id = 22;
        await UserModel.update({ 
                    
            is_deleted: 1},{
                where: {
                    [Op.and]: [
                    {id: this.user_id},
                    {is_deleted:0}
                    ]     
        }});
        return true;        
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
            console.log('Password does not match');
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
             return "You didn't made any changes";
        
        }else if(first_name!=undefined && last_name==undefined && profile_pic!=undefined){
            await UserModel.update({ 
                first_name:frist_name , 
                profile_pic:profile_pic}, {
                where: {
                    id:user_id
                }
              })
            return "successfully Update Details";

        }else if(first_name!=undefined && last_name!=undefined && profile_pic==undefined){
            await UserModel.update({ 
                first_name:frist_name , 
                last_name:last_name}, {
                where: {
                    id:user_id
                }
              })
            return "successfully Update Details";

        }else if(first_name==undefined && last_name!=undefined && profile_pic!=undefined){
            await UserModel.update({  
                last_name:last_name,
                profile_pic:profile_pic}, {
                where: {
                    id:user_id
                }
              })
            return "successfully Update Details";

        }else if(first_name==undefined && last_name==undefined && profile_pic!=undefined){
            await UserModel.update({ 
                profile_pic:profile_pic}, {
                where: {
                    id:user_id
                }
              })
            return "successfully Update Details";

        }else if(first_name==undefined && last_name==undefined && profile_pic!=undefined){
            await UserModel.update({  
                last_name:last_name}, {
                where: {
                    id:user_id
                }
              })
            return "successfully Update Details";

        }else if(first_name==undefined && last_name!=undefined && profile_pic!=undefined){
            await UserModel.update({ 
                first_name:frist_name}, {
                where: {
                    id:user_id
                }
              })
            return "successfully Update Details";
            
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
        
        this.requester_id = 2;
        let reque_id=this.requester_id;
        let checkin=null;
            
        checkin = await Connection.checkValidations(recipient_id,reque_id);
          
           
        if(checkin===true){
                    
            let connection = new Connection({requester_id: this.requester_id, recipient_id: recipient_id});
            return await connection.saveToDatabase(true);
            //return connection;
       
        }else{
            return "Already exists";
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
        this.user_id = 1;
    
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
        user_id:user_id;
       
        const user=await UserModel.findAll({
            attributes:['first_name','last_name','profile_pic'], raw: true,
            where:{
                id:user_id
                    
            }
    
            });
        const records= await RecommendationModel.findAll({
            attributes:['Recommended_by','description'], raw: true,
            where:
                [{user_id:user_id}]
        });
    
        const skills=await SkillModel.findAll({
            attributes:['name','validations'], raw: true,
            where:
                [{user_id:user_id}]
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


    async  createAccount(info) {
        //check if the user had already created an account 
        let guest_email = info[0].email;
        let cnt = await UserModel.count({where: {
            [Op.and]: [
                { email: guest_email },
                { is_deleted: 0 }
        ]}});
    
        if (cnt > 0) {
            return "Already you have an account";

        }else{
            let guest_first_name = info[0].first_name;
            let guest_last_name = info[0].last_name;
            let guest_password = info[0].password;
            
    
            let result = new User();
            await result.addUser(guest_first_name, guest_last_name,guest_email,guest_password);
            return true;
         
        }
            
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
// viewEvent(1).then(result=>console.log("Event Details: ",result));
//user1.createAccount([{first_name: "Lahiru" ,last_name: "Madhushan", email:'lahiru@gmail.com', password:'abc'}]).then(result => console.log('Account Creation: ', result));