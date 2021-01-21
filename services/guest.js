const sequelize=require('../config/database');
const UserModel=require('../models/user-model');
const {Op} = require("sequelize");

class Guest{
    
    constructor(){
        try {
            sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
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

}
//guest1 = new Guest();
//guest1.searchUser("Ridmi").then(result => console.log('Connection Added: ', result));