const sequelize=require('../config/database');
const UserModel=require('../models/user-model');
const {Op} = require("sequelize");
const md5 = require('md5');


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
                [Op.or]:[{first_name: `${name}`},{last_name: `${name}`}]
            
            }
        });
        return user;
    } 

    async viewProfile(user_id){
        user_id:user_id;
       
        const user=await UserModel.findAll({
            attributes:['first_name','last_name','profile_pic'], raw: true,
            where:{
                id:`${user_id}`
                    
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
guest1 = new Guest();
//guest1.searchUser("Ridmi").then(result => console.log('Connection Added: ', result));
//guest1.createAccount([{first_name: "Lahiru" ,last_name: "Madhushan", email:'lahiru1@gmail.com', password:'abc'}]).then(result => console.log('Account Creation: ', result));