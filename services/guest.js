const sequelize=require('../config/database');
const UserModel=require('../models/user-model');
const {Op} = require("sequelize");
const md5 = require('md5');
const RecommendationModel = require('../models/recommendation-model');
const SkillModel = require('../models/skill-model');
const ConnectionModel = require('../models/connection-model');


class Guest{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
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
            return false;

        }else{
            let guest_first_name = info[0].first_name;
            let guest_last_name = info[0].last_name;
            let guest_password = info[0].password;
            
    
            //let result = new User();
            await this.addUser(guest_first_name, guest_last_name,guest_email,guest_password);
            return true;
         
        }
            
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
   

    async searchUser(name){
    
        const user=UserModel.findAll({
            attributes:['first_name','last_name','profile_pic'], raw: true,
            where:{
                [Op.or]:[{first_name: `${name}`,is_deleted:0},{last_name: `${name}`, is_deleted:0}]
                    
            }
        });
        return user;
    
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
            attributes:['name','validations'], raw: true,
            where:
                [{user_id:`${user_id}`}]
        });

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

        //console.log(connections);
        //return records;
        //return user;
        //return mergeduser;
        return profile;
    }

    async getUser(email){
        

        const login_id = await UserModel.findOne({
            arrtibute:["id"],
            where:{
                email:email
            },raw:true
        });

        
        let user_id= login_id.id;
       
        const user=await UserModel.findAll({
            attributes:['first_name','last_name','profile_pic','password','id'], raw: true,
            where:{[Op.and]:
                [{id:user_id,is_deleted:0}]
                    
            }
    
            });
       
        const records= await RecommendationModel.findAll({
            attributes:['Recommended_by','description'], raw: true,
            where:
                [{user_id:user_id}]
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
            attributes:['name','validations'], raw: true,
            where:
                [{user_id:user_id}]
        });

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

        //console.log(connections);
        //return records;
        //return user;
        //return mergeduser;
        
        return profile;
        
    }


}

module.exports=Guest;
//guest1 = new Guest();
//guest1.searchUser("Lahiru").then(result => console.log('Connection Added: ', result));
//guest1.createAccount([{first_name: "Lahiru" ,last_name: "Madhushan", email:'lahiru1@gmail.com', password:'abc'}]).then(result => console.log('Account Creation: ', result));
//guest1.viewProfile(2).then(result => console.log('Profile Status: ', result));
//guest1.getUser("sanga@gmail.com").then(result => console.log('Connection Added: ', result));