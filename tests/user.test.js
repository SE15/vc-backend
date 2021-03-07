
const User= require("../services/user");
const db = require("../models/user-model");
const cdb = require("../models/connection-model");
const sequelize = require("../config/database");

describe('searchUser', () => {
    let name;
    let arr;

    const exec = async()=>{
        db.findAll = jest.fn().mockReturnValue(arr); 
        const user1 = new User();
        return await user1.searchUser(name);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        name="Lahi";
        arr=[{ first_name: 'Lahiru', last_name: 'Madhushan', profile_pic: null  }];
    });

    it('should return an array containing one element if there is only one user maching to the text ', async()=>{
        
        const result = await exec();
        expect(result).toContainEqual({ first_name: 'Lahiru', last_name: 'Madhushan', profile_pic: null});
    
    });

    it('should return an array containing more than one element if there are more than one user maching to the text ', async()=>{
        name="Oshan"
        arr=[{ first_name: 'Oshani', last_name: 'Weerasinghe', profile_pic: null },
             { first_name: 'Oshan', last_name: 'Jayawardhana', profile_pic: null } ]
        const result = await exec();
        expect(result).toContainEqual({ first_name: 'Oshani', last_name: 'Weerasinghe', profile_pic: null },
                                      { first_name: 'Oshan', last_name: 'Jayawardhana', profile_pic: null } );
    
    });

    it('should return an empty array if there is no such user matches to the text', async()=>{

        name="Pasan";
        arr=[];
        const result = await exec();                
        expect(result).toEqual([]);
    
    });
});

describe('changePassword', () => {

    let oldPassword;

    const exec = async()=> {
        db.findOne = jest.fn().mockReturnValue({ first_name: 'Kusal', last_name: 'Mendis', password: '202cb962ac59075b964b07152d234b70', profile_pic: null });
        db.update = jest.fn(); 
        const user1 = new User();
        return await user1.changePassword(oldPassword, '456', 34);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn(); 
        oldPassword ="123";    
    });

    it('should return true if the old password and the inputed password matches ', async() => {
        const result = await exec();               
        expect(result).toBeTruthy();
    });

    it('should return false if the old password and the inputed password not matches ', async() => {
        oldPassword = "789";
        const result = await exec();               
        expect(result).toBeFalsy();
    });
});

describe('addConnection' , ()=> {

    let counter;
    let requesterId;
    let recipientId;

    const exec = async()=>{
        cdb.count = jest.fn().mockReturnValue(counter);
        cdb.create =jest.fn();        
        cdb.findOne = jest.fn().mockReturnValue({requester_id:requesterId, recipient_id:recipientId, state:"pending"});
        const user1 = new User();
                        
        return await user1.addConnection(recipientId,requesterId);
    }    

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        counter=0;
        requesterId=11;
        recipientId=33;
    });
       
    it('should return true if the request is sent successfully', async()=>{
        const result = await exec();            
        expect(result).toBeTruthy();

    });

    it("should return 'sent' if the request is already sent", async()=>{
        counter=1;
        requesterId=21;
        recipientId=33;
        const result = await exec();              
        expect(result).toMatch(/sent/);

    });

    it("should return an error message if it throws an exception", async()=>{

        cdb.count = jest.fn().mockReturnValue(0);
        cdb.create =jest.fn().mockRejectedValue(new Error());        
        cdb.findOne = jest.fn().mockReturnValue({requester_id:null, recipient_id:null, state:undefined});
        const user1 = new User();
                        
        const result= await user1.addConnection(recipientId,requesterId);                          
        expect(result).toMatch(/Something went wrong/);

    });

    
});

describe('removeConnection', ()=> {

    let requesterId;
    let recipientId;

    const exec = async()=> {
        cdb.findOne = jest.fn().mockReturnValue({requester_id:requesterId, recipient_id:recipientId, state:"accepted"});
        cdb.destroy = jest.fn();
        const user1 = new User();
        return await user1.removeConnection(recipientId,requesterId);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn(); 
        requesterId=33;
        recipientId=21;            
    });

    it('should return true if connection is removed successfully', async()=> {
        const result = await exec();            
        expect(result).toBeTruthy();
    });

    it('should return false if connection is not removed successfully', async()=> {
        cdb.findOne = jest.fn().mockReturnValue({requester_id:requesterId, recipient_id:recipientId, state:"accepted"});
        cdb.destroy = jest.fn().mockRejectedValue(new Error());
        const user1 = new User();
        const result = await user1.removeConnection(recipientId,requesterId);            
        expect(result).toBeFalsy();
    });
});

describe('respondConnection', ()=> {

    let counter;
    let accept;
    let requesterId;
    let recipientId;

    const exec = async()=> {
        cdb.count = jest.fn().mockReturnValue(counter);
        cdb.update = jest.fn();
        const user1 = new User();
        return await user1.respondConnection(recipientId, accept,requesterId);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn(); 
        counter=1;
        accept=true;
        requesterId=33;
        recipientId=21;            
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

    it('should return a message if the recipient has already accepted/removed connection', async()=>{
        counter=0;
        const result = await exec();            
        expect(result).toMatch("removed one/accepted one");
    });
});






