const ConnectionModel = require('../../models/connection-model');
const { Op } = require("sequelize");
const sequelize = require('../../config/database');

class Connection {
    constructor(info) {
        this.requester_id = info.requester_id;
        this.recipient_id = info.recipient_id;
        this.state = info.state;
        
    }

    async saveToDatabase(){
        //adding a new connection to the database
            await ConnectionModel.create({ 
                requester_id: this.requester_id,
                recipient_id: this.recipient_id,
                state:"pending"});
                   
            let result = await ConnectionModel.findOne({where: {
                [Op.and]: [
                    { requester_id: this.requester_id },
                    { recipient_id: this.recipient_id }
            ]}});                        
            this.state = result.state; 
                          
        return true; 
        
        
        
    }

    async destroy() {
        try{
        await ConnectionModel.destroy({where: {
            [Op.and]: [
                {requester_id: this.requester_id},
                {recipient_id: this.recipient_id }
                
            ]}});
        return true;
        }catch(e){
            return false;
        }
    }

    static async create(recipient_id,reque_id) {
        
        let connectionInfo = null;
        //gets the information from the database
        let connectionInfo1 = await ConnectionModel.findOne({where: {
            [Op.and]: [
            {requester_id: reque_id},
            {recipient_id: recipient_id}
            ]}});
          
        let connectionInfo2 = await ConnectionModel.findOne({where: {
            [Op.and]: [
            {requester_id: recipient_id},
            {recipient_id: reque_id}
            ]}});
            
        if (connectionInfo1 ===null )  {
             connectionInfo = connectionInfo2;
        }else{
            connectionInfo = connectionInfo1;
        }          
        return new Connection(connectionInfo);
    }

    static async checkValidations(recipient_id, reque_id) {
        //check if the user has already sent or got the request
        let cnt1 = await ConnectionModel.count({where: {
            [Op.and]: [
                { recipient_id: recipient_id },
                { requester_id: reque_id },
                { state:'pending'}
            ] 
        }})                
        let cnt2 = await ConnectionModel.count({where: {
            [Op.and]: [
                { requester_id: recipient_id },
                { recipient_id: reque_id },
                { state:'pending'}
            ] 
        }})
        
        
        if (cnt1 === 0 && cnt2===0) {
             return true;   
            /*try {
                return true; 
            } catch(err) {
                throw err;
            }*/
        } else {
            return false;
            //if(cnt1!=0){
              //  return false;
            //}else{
              //  return false;
            //}

                
        }
        
    }

    static async updateState(recipi_id,requester_id,accept,t=null){
        if(accept===true){
                await ConnectionModel.update({ 
                    
                    state: "accepted"},{
                    where: {
                        [Op.and]: [
                            { requester_id: requester_id },
                            { recipient_id: recipi_id }
                        ]}, transaction : t});
                        return true;
            
            }

            else{
                await ConnectionModel.update({ 
                    
                    state: "rejected"},{
                    where: {
                        [Op.and]: [
                            { requester_id: requester_id },
                            { recipient_id: recipi_id }
                        ]}, transaction : t});
                return false;
                       
            }   
         
        
        
        }
    }
        
 
module.exports = Connection;
