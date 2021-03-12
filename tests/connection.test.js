const cdb = require("../models/connection-model");
const Connection = require("../services/user/connection");
const sequelize = require("../config/database");

describe('saveToDatabase' , ()=> {

    let requesterId;
    let recipientId;

    const exec = async()=>{
        cdb.create =jest.fn();        
        cdb.findOne = jest.fn().mockReturnValue({requester_id:requesterId, recipient_id:recipientId, state:"pending"});
        const connection1 = new Connection({requester_id:requesterId, recipient_id:recipientId});
        return await connection1.saveToDatabase();
    };
    
    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        requesterId=11;
        recipientId=33;
    }); 

    it('should return true if the record is successfully created and saved', async()=>{
        const result = await exec();        
        expect(result).toBeTruthy();
    });
});

describe('destroy', ()=>{

    let requesterId;
    let recipientId;

    const exec = async()=>{
        const connection1 = new Connection({requester_id:requesterId, recipient_id:recipientId});
        return await connection1.destroy();
    };
    
    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        requesterId=11;
        recipientId=33;
    });
    
    it('should return true if the record is successfully deleted', async()=>{
        cdb.destroy = jest.fn();
        const result = await exec();        
        expect(result).toBeTruthy();
    });

    it('should return false if it throws an error', async()=>{        
        cdb.destroy = jest.fn().mockRejectedValue(new Error());        
        const result = await exec();                
        expect(result).toBeFalsy();
    });
});

describe('create', ()=> {

    let requesterId;
    let recipientId;
    
    const exec = async()=>{  
        cdb.findOne = jest.fn().mockReturnValueOnce(connectionInfo1).mockReturnValueOnce(connectionInfo2);      
        return await Connection.create(requesterId, recipientId);
    };
    
    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        requesterId=11;
        recipientId=33;
        connectionInfo1={requester_id:requesterId, recipient_id:recipientId, state:"accepted"};           
        connectionInfo2 = null;
    });

    it('should return a new connection object whenever the requester is the exact requester', async()=> {
        const result = await exec();                    
        expect(result).toEqual({requester_id:requesterId, recipient_id:recipientId, state:"accepted"});
    });

    it('should return a new connection object whenever the requester is the recipient', async()=> {
        requesterId=33;
        recipientId=11;
        connectionInfo1=null;
        connectionInfo2 = {requester_id:requesterId, recipient_id:recipientId, state:"accepted"};
        const result = await exec();                 
        expect(result).toEqual({requester_id:requesterId, recipient_id:recipientId, state:"accepted"});
    });
});

describe('checkValidations', ()=> {

    const exec = async()=>{ 
        cdb.count = jest.fn().mockReturnValueOnce(cnt1).mockReturnValueOnce(cnt2);       
        return await Connection.checkValidations(requesterId, recipientId);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        cnt1=0;
        cnt2=0;
        requesterId=11;
        recipientId=6;
    });

    it('should return true if such connection is does not exist', async()=>{
        const result = await exec();            
        expect(result).toBeTruthy();

    });

    it('should return false if such connection already exists and the current user is the one who sent it', async()=>{
        cnt1=1;
        cnt2=0;
        requesterId=11;
        recipientId=33;
        const result = await exec();            
        expect(result).toBeFalsy();

    });

    it('should return false if such connection already exists and the current user is the one who received it', async()=>{
        cnt1=0;
        cnt2=1;
        requesterId=33;
        recipientId=11;
        const result = await exec();            
        expect(result).toBeFalsy();

    });
});

describe('updateState' , ()=> {

    const exec = async()=>{ 
        cdb.update = jest.fn();       
        return await Connection.updateState( recipientId, requesterId, accept);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        accept=true;
    });

    it('should return true if the recipient accept the connection request', async()=>{
        const result = await exec();            
        expect(result).toBeTruthy();
    });

    it('should return false if the recipient reject the connection request', async()=>{
        accept=false;
        const result = await exec();            
        expect(result).toBeFalsy();
    });

});