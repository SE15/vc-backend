
const User= require("../services/user");
const db = require("../models/user-model");
const rdb = require("../models/recommendation-model");
const sdb = require("../models/skill-model");
const cdb = require("../models/connection-model");
const vdb = require("../models/validation-model");
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
        cdb.count = jest.fn().mockReturnValueOnce(cnt1).mockReturnValueOnce(cnt2);
        cdb.create =jest.fn();        
        cdb.findOne = jest.fn().mockReturnValue({requester_id:requesterId, recipient_id:recipientId, state:"pending"});
        const user1 = new User();
                        
        return await user1.addConnection(recipientId,requesterId);
    }    

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        cnt1=0;
        cnt2=0;
        requesterId=11;
        recipientId=33;
    });
       
    it('should return true if the request is sent successfully', async()=>{
        const result = await exec();            
        expect(result).toBeTruthy();

    });
    
    it("should return 'sent' if the request is already sent", async()=>{
        cnt1=1;
        cnt2=0;
        requesterId=21;
        recipientId=33;
        const result = await exec();              
        expect(result).toMatch(/sent/);

    });

    it("should return 'sent' if the request is already received", async()=>{
        cnt1=0;
        cnt2=1;
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

    it('should throw an error if the request ', async()=>{
        const result = await exec();            
        expect(result).toBeTruthy();

    });

    
});

describe('removeConnection', ()=> {

    let requesterId;
    let recipientId;
    let connectionInfo1;
    let connectionInfo2;

    const exec = async()=> {
        cdb.findOne = jest.fn().mockReturnValueOnce(connectionInfo1).mockReturnValueOnce(connectionInfo2);
        cdb.destroy = jest.fn();
        const user1 = new User();
        return await user1.removeConnection(recipientId,requesterId);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn(); 
        requesterId=33;
        recipientId=21; 
        connectionInfo1={requester_id:requesterId, recipient_id:recipientId, state:"accepted"};           
        connectionInfo2 = null;
    });

    it('should return true if connection is removed successfully whenever the requester is the exact requester', async()=> {
        const result = await exec();            
        expect(result).toBeTruthy();
    });

    it('should return true if connection is removed successfully whenever the requester is the recipient', async()=> {
        connectionInfo1=null;
        connectionInfo2 = {requester_id:requesterId, recipient_id:recipientId, state:"accepted"};
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

describe('viewProfile', ()=> {

    let userId;
    let personal_arr;
    let recommendation_arr;
    let skill_arr;
    let con_arr;
    let re_arr;
    let passedId;
    

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        userId = 33;
        passedId = 10;
        personal_arr=[{id:33, first_name: 'Oshan', last_name: 'Jayawardhana', profile_pic: '' }];
        recommendation_arr= [
            { Recommended_by: 2, description: 'Amazing ' },
            { Recommended_by: 26, description: 'Highly recommended' }];
          
        skill_arr = [
            {
              id: 146,
              name: 'mysql hh',
              validations: 1,
              alreadyValidated: false
            },
            {
              id: 140,
              name: 'mysql skills11',
              validations: 1,
              alreadyValidated: false
            }
          ];
           
        con_arr = [ { id: 6, first_name: 'Danushka', last_name: 'Gunathilake' } ];
         
        arr1=  {id:2, first_name: 'Danushka', last_name: 'Gunathilaka' };
        arr2= {id:26, first_name: 'Lahiru', last_name: 'Madhushan' }
        re_arr =[
            { id:2 ,first_name: 'Danushka',last_name: 'Gunathilaka', description: 'Amazing '},
            {id:26 ,first_name: 'Lahiru',last_name: 'Madhushan', description: 'Highly recommended' } ];

    });

    const exec = async()=>{
        db.findAll = jest.fn().mockReturnValue(personal_arr); 
        rdb.findAll = jest.fn().mockReturnValue(recommendation_arr);        
        db.findOne = jest.fn().mockReturnValueOnce(arr1).mockReturnValueOnce(arr2).mockReturnValueOnce({ id: 6, first_name: 'Danushka', last_name: 'Gunathilake' });                
        sdb.findAll = jest.fn().mockReturnValue(skill_arr);
        cdb.findAll = jest.fn().mockReturnValueOnce([]).mockReturnValueOnce([{ recipient_id: 6 } ]);
        vdb.findAll = jest.fn().mockReturnValue([]);
        const user1 = new User();
        return await user1.viewProfile(userId,passedId);
    };

    it('should return an array if the profile is viewed successfully', async()=> {
        const result = await exec();                               
        expect(result).toContainEqual(personal_arr);
        expect(result).toContainEqual(re_arr);
        expect(result).toContainEqual(skill_arr);  
        expect(result).toContainEqual(con_arr);    
    });
});






