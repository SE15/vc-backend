
const User= require("../services/user");
const Skill=require("../services/user/skill");
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

    /*it('should throw an error if the request ', async()=>{
        const result = await exec();            
        expect(result).toBeTruthy();

    });*/

    
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
    let alreadyValidatedSkills;
    let connections1, connections2;
    

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        userId = 33;
        passedId = 10;
        connections1=[];
        connections2=[{ recipient_id: 6 } ];
        alreadyValidatedSkills=[];
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
        cdb.findAll = jest.fn().mockReturnValueOnce(connections1).mockReturnValueOnce(connections2);
        vdb.findAll = jest.fn().mockReturnValue(alreadyValidatedSkills);
        const user1 = new User();
        return await user1.viewProfile(userId,passedId);
    };

    it('should return an array if the profile is viewed successfully and checks whether the each connection is sent by the user', async()=> {
        const result = await exec();                               
        expect(result).toContainEqual(personal_arr);
        expect(result).toContainEqual(re_arr);
        expect(result).toContainEqual(skill_arr);  
        expect(result).toContainEqual(con_arr);    
    });

    it('should return an array if the profile is viewed successfully and checks whether the each connection is received to the user', async()=> {
        connections1=[{ recipient_id: 6 } ];
        connections2=[];
        const result = await exec();                               
        expect(result).toContainEqual(personal_arr);
        expect(result).toContainEqual(re_arr);
        expect(result).toContainEqual(skill_arr);  
        expect(result).toContainEqual(con_arr);    
    });

    it('should return an array if the profile is viewed successfully and checks whether the current user already validated the skills', async()=> {
        passeId=26;
        alreadyValidatedSkills=[146];
        const result = await exec();                               
        expect(result).toContainEqual(personal_arr);
        expect(result).toContainEqual(re_arr);
        expect(result).toContainEqual(skill_arr);  
        expect(result).toContainEqual(con_arr);    
    });
});

describe('showRecommendation Test', () => {
 
    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
    });
 
    it("should return an array of user's recommendations if recommendations are available", async()=>{
        rdb.findAll = jest.fn().mockReturnValue([{recommended_by:2,description:'Amazing'}]) ;
            
        const user1 = new User();
        const result=await user1.showRecommendation(33);
        expect(result).toEqual([{recommended_by:2,description:'Amazing'}]);
    
    });

    it('should return false if there is an error with show recommendations', async()=>{
        rdb.findAll = jest.fn().mockReturnValue(null) ;
            
        const user1 = new User();
        const result=await user1.showRecommendation(11);
        expect(result).toEqual(false);
    
    });
});

describe('submitRecommendation', () => {
 
    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
    });
 
    it('should return a message if already recommended', async()=>{
        rdb.findOne = jest.fn().mockReturnValue([{user_id:11,recommended_by:2}]) ;
            
        const user1 = new User();
        const result=await user1.submitRecommendation(2,11,"Amazing");
        expect(result).toEqual("Already Recommended");
    
    });

    it('should return true if recomendation is for the first time', async()=>{
        rdb.findOne = jest.fn().mockReturnValue(null) ;
        rdb.create = jest.fn().mockReturnValue(true) ;
            
        const user1 = new User();
        const result=await user1.submitRecommendation(2,11,"Amazing");
        expect(result).toEqual(true);
    
    });
});

describe('editProfile', () => {
 
    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
    });
 
    it('should return false if no edit details', async()=>{

        const user1 = new User();
        const result=await user1.editProfile({},1);
        expect(result).toEqual(false);
    
    });

    it('should return true if all 3 detailes are editing', async()=>{
        db.update = jest.fn().mockReturnValue() ;
            
        const user1 = new User();
        const result=await user1.editProfile({first_name:'dinesh',last_name:'chandimal',profile_pic:"123"},1);        
        expect(result).toEqual(true);
    
    });

    it('should return true if only first name is editing', async()=>{
        db.update = jest.fn().mockReturnValue() ;
            
        const user1 = new User();
        const result=await user1.editProfile({first_name:'dinesh'},1);
        expect(result).toEqual(true);
    
    });

    it('should return true if only first name and last name is editing', async()=>{
        db.update = jest.fn().mockReturnValue() ;
            
        const user1 = new User();
        const result=await user1.editProfile({first_name:'dinesh',last_name:'chandimal'},1);
        expect(result).toEqual(true);
    
    });

    it('should return true if only last name  and profile picture is editing', async()=>{
        db.update = jest.fn().mockReturnValue() ;
            
        const user1 = new User();
        const result=await user1.editProfile({last_name:'chandimal',profile_pic:"123"},1);
        expect(result).toEqual(true);
    
    });

    it('should return true if only profile picture is editing', async()=>{
        db.update = jest.fn().mockReturnValue() ;
            
        const user1 = new User();
        const result=await user1.editProfile({profile_pic:"123"},1);
        expect(result).toEqual(true);
    
    });

    it('should return true if only last name picture is editing', async()=>{
        db.update = jest.fn().mockReturnValue() ;
            
        const user1 = new User();
        const result=await user1.editProfile({last_name:'chandimal'},1);
        expect(result).toEqual(true);
    
    });

    it('should return true if only first name  and profile pic is editing', async()=>{
        db.update = jest.fn().mockReturnValue() ;
            
        const user1 = new User();
        const result=await user1.editProfile({first_name:'dinesh',profile_pic:"123"},1);
        expect(result).toEqual(true);
    
    });

});

describe('deleteAccount', () => {
 
    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
    });
 
    it('should return true after dlelte all data', async()=>{
        db.update = jest.fn().mockReturnValue(1) ;
        sdb.destroy = jest.fn().mockReturnValue(0) ;
        rdb.destroy = jest.fn().mockReturnValue(0) ;
        cdb.destroy = jest.fn().mockReturnValue(0) ;
            
        const user1 = new User();
        const result=await user1.deleteAccount(1);
        expect(result).toEqual(true);
    
    });

    it('should return false when user is cannot find', async()=>{
        db.update = jest.fn().mockReturnValue(0) ;
        sdb.destroy = jest.fn().mockReturnValue(0) ;
        rdb.destroy = jest.fn().mockReturnValue(0) ;
        cdb.destroy = jest.fn().mockReturnValue(0) ;
            
        const user1 = new User();
        const result=await user1.deleteAccount(1);
        expect(result).toEqual(false);
    
    });

});

describe('viewRequests', ()=> {

    let recipientId, connections ,name;

    const exec = async()=>{
        cdb.findAll = jest.fn().mockReturnValue(connections);
        db.findOne = jest.fn().mockReturnValue(name);
        const user1 = new User();
        return await user1.viewRequests(recipientId);
    }    

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        recipientId=2;
        connections=[ { requester_id: 33 } ];
        name={id: 33, first_name: 'Oshan', last_name: 'Jayawardhana', profile_pic: ''};
    });

    it('should return an array containing all the requests if the user has any requests', async()=>{
        const result = await exec();                                       
        expect(result).toContainEqual(name);
    });

    it('should return an empty array if the user has not received any requests', async()=>{
        recipientId=33;
        connections=[];        
        const result = await exec();                                       
        expect(result).toEqual([]);
    });
});

describe('getConnectionState', ()=> {

    let cnt1, cnt2, requesterId, recipientId;

    const exec = async()=>{
        cdb.count = jest.fn().mockReturnValueOnce(cnt1).mockReturnValueOnce(cnt2);
        const user1 = new User();
        return await user1.getConnectionState(requesterId, recipientId);
    }    

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        cnt1=1;
        cnt2=0;
        requesterId=33;
        recipientId=2;
    });

    it("it should return 'pending' if the corresponding connection is at the pending state", async()=>{
        const result = await exec();                                       
        expect(result).toMatch(/pending/);
    });

    it("it should return 'accepted' if the corresponding connection is at the accepted state", async()=>{
        cnt1=0;
        cnt2=1;
        requesterId=62;
        recipientId=6;
        const result = await exec();                                       
        expect(result).toMatch(/accepted/);
    });

    it("it should return 'none' if such connection does not exist", async()=>{
        cnt1=0;
        cnt2=0;
        requesterId=11;
        recipientId=21;
        const result = await exec();                                       
        expect(result).toMatch(/none/);
    });
});

describe('getAllUsers', ()=>{

    let users, obj;
    const exec = async()=>{
        db.findAll = jest.fn().mockReturnValue([obj]);
        const user1 = new User();
        return await user1.getAllUsers();
    }    

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        obj={
            first_name: 'Lahiru',
            last_name: 'Madhushan',
            email: 'cha@gmail.com',
            profile_pic: ''
          },
          {
            first_name: 'Oshani',
            last_name: 'Weerasinghe',
            email: 'lasath@gmail.com',
            profile_pic: ''
          },
          {
            first_name: 'Mahela',
            last_name: 'sangakkara',
            email: 'sanga@gmail.com',
            profile_pic: '5678'
          },
          {
            first_name: 'Kusall',
            last_name: 'Menda',
            email: 'mendis@gmail.com',
            profile_pic: ''
          },
          {
            first_name: 'Oshan',
            last_name: 'Jayawardhana',
            email: 'oshan@gmail.com',
            profile_pic: ''
          },
          {
            first_name: 'Mahela',
            last_name: 'jayawardhana',
            email: 'mahela@gmail.com',
            profile_pic: ''
          };
              
    });

    it('should return an array containing all user objects',async()=> {
        const result = await exec();                                       
        expect(result).toContainEqual(obj);
    });
});

describe('removeSkill', ()=> {

    let id;
    
    const exec = async()=> {
        sdb.findOne = jest.fn().mockReturnValue({id:1,user_id:11,name:"sql",validations:1})
        const user1 = new User();
        return await user1.removeSkill(id);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn(); 
        id=1; 
    });

    it('should return true if skill is removed successfully', async()=> {
        sdb.destroy = jest.fn().mockReturnValue(true);
        const result = await exec();            
        expect(result).toBeTruthy();
    });

    it('should return false if skill remove is not successfully', async()=> {
        sdb.destroy = jest.fn().mockReturnValue(false);
        const result = await exec();            
        expect(result).toBeFalsy();
    });

});

describe('addSkill', ()=> {

    let user_id;
    
    const exec = async()=> {
        
        sdb.findOne = jest.fn().mockReturnValue({id:60,validations:0});
        sdb.update = jest.fn();
        //const skill=new Skill({user_id:this.user_id});
        //skill.saveToDatabase(true)= jest.fn().mockReturnValue(true);
        const user1 = new User();
        return await user1.addSkill(user_id);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn(); 
        user_id=1; 
    });

    it('should return false if skill added not successfully when throw an exception', async()=> {
        sdb.create = jest.fn(new Error());
        const result = await exec();            
        expect(result).toBeFalsy();
    });
    
    it('should return true if skill is added successfully when adding a new skill', async()=> {
        sdb.create = jest.fn();
        const result = await exec();            
        expect(result).toBeTruthy();
    });

});

describe('validateSkill', ()=> {
    
    const exec = async()=> {
        const user1 = new User();
        return await user1.validateSkill(skill_id,passed_id);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn(); 
        skill_id=1;
        passed_id=2;
    });

    it('should return a message when user trying to validate his own skill', async()=> {
        vdb.count = jest.fn().mockReturnValue(0);
        sdb.findOne = jest.fn().mockReturnValue({id:1,name:"sql",user_id:1,validations:0})
        passed_id=1;
        const result = await exec();            
        expect(result).toEqual("You cannot validate your own skill");
    });

    it('should return a message when user trying to validate already validated skill', async()=> {
        sdb.findOne = jest.fn().mockReturnValue({id:1,name:"sql",user_id:1,validations:0})
        vdb.count = jest.fn().mockReturnValue(1);
        const result = await exec();            
        expect(result).toEqual("validated");
    });

    it('should return true when user trying to validate a skill', async()=> {
        sdb.findOne = jest.fn().mockReturnValue({id:1,name:"sql",user_id:1,validations:0})
        vdb.count = jest.fn().mockReturnValue(0);
        sequelize.transaction = jest.fn();
         /*   this.validations++;
            vdb.create = jest.fn({transaction:t});
        });
        sdb.update = jest.fn();*/

        const result = await exec();            
        expect(result).toBeTruthy();
    });

});




