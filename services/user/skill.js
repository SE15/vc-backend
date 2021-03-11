const SkillModel = require('../../models/skill-model');
const ValidationModel = require('../../models/validation-model');
const { Op } = require("sequelize");
const sequelize = require('../../config/database');

class Skill {
    constructor(info) {
        this.id = info.id;
        this.name = info.name;
        this.user_id = info.user_id;
        this.validations = info.validations;
    }

    /**
     * Returns an existing skill object in the database
     * 
     * @param {number} id id of the skill. 
     * @returns {Promise} Promise of a Skill object
     * @throws UnhandledPromiseRejectionWarning
     */
    static async create(id) {
        //gets the information from the database
        let skillInfo = await SkillModel.findOne({where: {id: id}});
        return new Skill(skillInfo);
    }
    
    /**
     * Increment the validations of this skill
     * 
     * @param {number} user_id 
     * @return {Promise} Promise of 'true' - successfully validated
     * @throws UnhandledPromiseRejectionWarning
     */
    async incrementValidations(user_id) {
        //check if the user has already validated this skill
        let cnt = await ValidationModel.count({where: {
            [Op.and]: [
                { skill_id: this.id },
                { validated_by: user_id }
            ] 
        }})
        if(user_id !== this.user_id) {
            if (cnt === 0) {
                //update the database for the increment in validations
               
                    //updating the both skill and verificiation model in single transaction
                    await sequelize.transaction(async (t) => {
                        this.validations++;
                        console.log(this.validations);
                        await ValidationModel.create({
                            skill_id: this.id,
                            validated_by: user_id
                        }, {transaction : t});
                        await this.saveToDatabase(false, t);
                    }); 
                    return true; 
               
            } else {
                return "validated";
            }
        } else {
            return 'You cannot validate your own skill';
        }
    }

    /**
     * Removes the skill from the database
     * 
     * @return boolean - true if successfully deleted
     */
    async destroy() {
        let deleteSkill=await SkillModel.destroy({where: {id: this.id}});

        if(deleteSkill==true){
            return true;
        }else{
            return false;
        }
        
    }
    
    /**
     * Saves the skill object to the database
     * 
     * @param {boolean} isNew if true, new record is added. Else, existing record is updated.
     * @param {Promise} t Promise of a transaction
     * @returns {Promise} Promise of 'true' - successfully saved
     * @throws UnhandledPromiseRejectionWarning
     */
    async saveToDatabase(isNew, t = null){
        try{
       //adding a new skill to the database
       if (isNew == true) { 
           await SkillModel.create({ 
               user_id: this.user_id,
               name: this.name}, { transaction: t });
               //obtaining the id of the skill
           let result = await SkillModel.findOne({where: {
               [Op.and]: [
                   { user_id: this.user_id },
                   { name: this.name }
           ]}}, { transaction: t });
           this.id = result.id;
           this.validations = result.validations;
           return true; 
       
       //updating an existing skill in the database
       } else { 
           if (t !== null) { //query should be atomic
               await SkillModel.update({ 
                   user_id: this.user_id,
                   name: this.name,
                   validations: this.validations},{
                   where: {id: this.id}, transaction : t});
           } else {
               await SkillModel.update({ 
                   user_id: this.user_id,
                   name: this.name,
                   validations: this.validations},{
                   where: {id: this.id}}); 
           }
           return true;
       }
   }catch(err){
       return false;
   }
   }


    /**
     * Returns skill information
     * 
     * @returns Object - skill information
     */
    /*getInformation() {
        return {
            id: this.id,
            name: this.name,
            user_id: this.user_id,
            validations: this.validations
        };
    }*/
}

module.exports = Skill;