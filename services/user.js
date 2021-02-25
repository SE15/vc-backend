const Sequelize= require('sequelize');
const bcrypt = require("bcrypt");
const UserModel=require('../models/user-model');
const SkillModel=require('../models/skill-model');
const ConnectionModel=require('../models/connection-model');
const RecommendationModel=require('../models/recommendation-model');
const ValidationModel=require('../models/validation-model');

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
            //console.log('Connection has been established successfully.');
        } catch (error) {
            //console.error('Unable to connect to the database:', error);
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
                [Op.or]:[{first_name:{[Op.like]:`%${name}%`} ,is_deleted:0},{last_name: {[Op.like]:`%${name}%`}, is_deleted:0}]
                    
            }
        });
        return user;
    
    }

    async deleteAccount(passedid){

        //temp data
        this.user_id = passedid;
        let deleteUser = await UserModel.update({ 
                    
            is_deleted: 1},{
                where: {
                    [Op.and]: [
                    {id: this.user_id},
                    {is_deleted:0}
                    ]     
        }});
        let deleteSkills=await SkillModel.destroy({
            where:{
                user_id:this.user_id
            }
        });

        let deleteRecommendations=await RecommendationModel.destroy({
            where:{
                user_id:this.user_id,
            }
        });
        let deleteConnections = await ConnectionModel.destroy({
            where:{
                [Op.or]:[
                    {recipient_id:this.user_id},
                {requester_id:this.user_id}
            ]}
        })
        //console.log(deleteSkills,deleteRecommendations);

        if (deleteUser==1 && deleteSkills!=null && deleteRecommendations!=null&& deleteConnections!=null){
            return true;   
        }else{
            return false;
        }

        
        
             
    }

    async changePassword(oldPassword,newPassword,passedid){
        //temp data
        this.user_id=passedid;
        
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
     async editProfile(details,passedid){
        this.user_id=passedid;
        var first_name=details.first_name;
        var last_name=details.last_name;
        var profile_pic=details.profile_pic;
        if (first_name==undefined && last_name==undefined && profile_pic==undefined){
             return false;
        
        }else if(first_name!=undefined && last_name!=undefined && profile_pic!=undefined){
            await UserModel.update({ 
                first_name:first_name,
                last_name:last_name,
                profile_pic:profile_pic
            }, {
                where: {
                    id:this.user_id
                }
              })
            return true;
            
        }else if(first_name!=undefined && last_name==undefined && profile_pic==undefined){
            await UserModel.update({ 
                first_name:first_name }, {
                where: {
                    id:this.user_id
                }
              });
            return true;

        }else if(first_name!=undefined && last_name!=undefined && profile_pic==undefined){
            await UserModel.update({ 
                first_name:first_name , 
                last_name:last_name}, {
                where: {
                    id:this.user_id
                }
              })
            return true;

        }else if(first_name==undefined && last_name!=undefined && profile_pic!=undefined){
            await UserModel.update({  
                last_name:last_name,
                profile_pic:profile_pic}, {
                where: {
                    id:this.user_id
                }
              })
            return true;

        }else if(first_name==undefined && last_name==undefined && profile_pic!=undefined){
            await UserModel.update({ 
                profile_pic:profile_pic}, {
                where: {
                    id:this.user_id
                }
              })
            return true;

        }else if(first_name==undefined && last_name!=undefined && profile_pic==undefined){
            await UserModel.update({  
                last_name:last_name}, {
                where: {
                    id:this.user_id
                }
              })
            return true;

        }else if(first_name!=undefined && last_name!=undefined && profile_pic!=undefined){
            await UserModel.update({ 
                first_name:first_name,
            profile_pic:profile_pic}, {
                where: {
                    id:this.user_id
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
    
    async addConnection(recipient_id,passedid) {
        //temp data
        
        this.requester_id = passedid;
        let reque_id=this.requester_id;
        let checkin=null;
            
        checkin = await Connection.checkValidations(recipient_id,reque_id);
                  
        try{   
        if(checkin===true){
                    
            let connection = new Connection({requester_id: this.requester_id, recipient_id: recipient_id});
            return await connection.saveToDatabase(true);
            
            //return connection;
       
        }else{
            return "sent";
        }
        }catch(e){
            return "Something went wrong";
        }
    }

    async  removeConnection(recipient_id,passedid) {
        //temp data
        this.requester_id = passedid;
        let reque_id=this.requester_id;
            
        let connection = await Connection.create(recipient_id,reque_id);
        return await connection.destroy();
        
    }

    async  respondConnection(requester_id,accept,passedid){

        this.recipient_id = passedid;
        let recipi_id=this.recipient_id;
        let res = null;
    
        let cnt2 = await ConnectionModel.count({where: {
            [Op.and]: [
                { requester_id: requester_id },
                { recipient_id: recipi_id },
                { state:'pending'}
            ] 
        }})
        
        if(cnt2 > 0){
            res = await Connection.updateState(recipi_id,requester_id,accept);
            return res;
        }else{
            return "removed one/ accepted one";
        }
    }

    async validateSkill(id,passedid) {
        //temp values
        this.user_id = passedid;

        let skill = await Skill.create(id);
        return await skill.incrementValidations(this.user_id);
        
    }

    async addSkill(name,passedid) {
        //temp data
    
        this.user_id = passedid;
        let skill = new Skill({user_id: this.user_id, name: name});
        let addSkill= await skill.saveToDatabase(true);
        if(addSkill==true){
            return true;
        }else{
            return false;
        }
        
        //return skill;
        
    }

    async removeSkill(id) {
        //temp data
        //this.user_id = 1;
        id=`${id}`
    
        let skill = await Skill.create(id);
        return await skill.destroy();
        
    }

    async submitRecommendation(user_id,description,passedid) {
        //temp data
        this.recommended_by = passedid;
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
        var recommendations=[]
        for (const i in records){
            let recommended_by= records[i].Recommended_by;
            let description=records[i].description;

            let recommended_name=await UserModel.findOne({
            attributes:["first_name","last_name"],
            where:{id:recommended_by},raw:true
            });

            recommended_name.description=description;
            recommendations.push(recommended_name);

        }
    
        const skills=await SkillModel.findAll({
            attributes:['id','name','validations'], raw: true,
            where:
                [{user_id:`${user_id}`}],
        });

        
        for(const j in skills){
                let skillid=skills[j].id;
                let validated=await ValidationModel.findAll({
                    attributes:["validated_by"],
                    where:{
                        skill_id:skillid
                    },raw:true

                    
                });
                let validatedby_arr=[];

                for (const k in validated){
                    let validated_id=validated[k].validated_by;
                    validatedby_arr.push(validated_id);
                }
                console.log(validatedby_arr)
                var arr=validatedby_arr.toString();
                skills[j].validated_by=arr;

        }


        var profile=[];
        profile.push(user);
        profile.push(skills);
        profile.push(recommendations);

        let connections1 = await ConnectionModel.findAll({
            attributes:["requester_id"],
            where:{[Op.and]:[{
                recipient_id:user_id
            },{state:"accepted"}]
        },raw:true});

        let connections2 = await ConnectionModel.findAll({
            attributes:["recipient_id"],
            where:{[Op.and]:[{
                requester_id:user_id
            },{state:"accepted"}]
        },raw:true});

        var names=[];

        for (const x in connections1){
            let con_id=connections1[x].requester_id;
           // console.log(con_id);
            
            let name=await UserModel.findOne({
                attributes:["first_name","last_name"],
                where:{
                    id:con_id
                },raw:true
            });
            //Object.assign({},name);

            names.push(name);

        }

        for (const y in connections2){
            let con_id=connections2[y].recipient_id;
           // console.log(con_id);
            
            let name=await UserModel.findOne({
                attributes:["first_name","last_name"],
                where:{
                    id:con_id
                },raw:true
            });
            //console.log(name);
            //Object.assign({},name);
            names.push(name);

        }

        
        profile.push(names);

        //return records;
        //return user;
        //return mergeduser;
        return profile;
    }




    
}
module.exports = User;
user1=new User();
//user1.addConnection(11).then(result => console.log('Connection Added: ', result));
//user1.removeConnection(11).then(result => console.log('Connection Removed: ', result));
//user1.respondConnection(32,true).then(result => console.log('Connection state updated: ', result));

//user1.validateSkill(4).then(result => console.log('Skill Validated:', result));
//user1.addSkill('mysql hh').then(result => console.log('Skill Added: ', result));
//user1.removeSkill(60).then(result => console.log('Skill Removed: ', result));

//user1.submitRecommendation(1,'recommnded').then(result => console.log('Recommendation Added: ', result));
//user1.showRecommendation(1).then(result=>console.log('Recommendation Records: ',result));
//user1.viewProfile(2).then(result=>console.log('Profile: ', result));

//user1.deleteAccount().then(result => console.log('Account Deleted: ', result));
//user1.changePassword("123","456").then(result => console.log('Password Changed: ', result));;
//user1.addUser("kamar", "sangakkara","sanga@gmail.com","123");
//user1.viewEvent(1).then(result=>console.log("Event Details: ",result));
//user1.viewEvent(1).then(result=>console.log("Event Details: ",result));

user1.searchUser("m").then(result=>console.log("Search Details: ",result));
