const RecommendationModel = require('../../models/recommendation-model');
const { Op } = require("sequelize");
const sequelize = require('../../config/database');


class Recommendation {
    constructor(info) {
        this.user_id = info.user_id;
        this.recommended_by = info.recommended_by;
        this.description = info.description;
        
    }

     async saveToDatabase(){
        
            await RecommendationModel.create({ 
                user_id: this.user_id,
                recommended_by: this.recommended_by,
                description:this.description});
                
            return true; 
    }

    async getInformation(){
        //get all information about recommendations of a user
            let records =  await RecommendationModel.findAll({
            attributes:['Recommended_by','description'], raw: true,
            where:
                [{user_id: this.user_id}]
                    
            
        })
        if(records){
            return records;
        }else{
            return false;
        }
    }

    static async checkValidations(user_id,recommended_by){
        //checking for already recommended or not
        let record= await RecommendationModel.findOne({
            where:{
                [Op.and]:[
                    {user_id:user_id},
                    {recommended_by:recommended_by}
                ]
            }
        })

        if (record){
            return false;
        }else{
            return true;
        }
    }
}          

module.exports = Recommendation;