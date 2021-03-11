const Guest= require("../services/guest");
const db = require("../models/user-model");
const rdb = require("../models/recommendation-model");
const sdb = require("../models/skill-model");
const cdb = require("../models/connection-model");
const vdb = require("../models/validation-model");
const sequelize = require("../config/database");

describe('createAccount', ()=> {

    let info;
    let counter;

    const exec = async()=>{
        db.count = jest.fn().mockReturnValue(counter);
        db.create = jest.fn().mockReturnValue({first_name:"Janith", last_name:"Nayanajith", password:"900150983cd24fb0d6963f7d28e17f72", email:"janith@gmail.com"}); 
        const guest1 = new Guest();
        return await guest1.createAccount(info);
    };
    
    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        info = [{first_name:"Janith", last_name:"Nayanajith", email:"janith@gmail.com", password:"abc"}];
        counter=0;
    }); 

    it('should return true if the guest successfully creates an account', async()=>{
        const result = await exec();        
        expect(result).toBeTruthy();
    });

    /*it('should throw an error if the connection is not established successfully', async()=>{
        
        sequelize.authenticate = jest.fn().mockImplementation(()=>{throw new Error('gg')});   
        const result = await exec();
        guest1.createAccount(info).catch(e=>{
            expect(e).toEqual({error: 'gg'});
        })
        //expect(async()=>{await guest1.createAccount(info)}).toThrow();
        //console.log(result);
    });*/

    it('should return false if the guest already created an account', async()=>{
        info = [{first_name:"Lahiru", last_name:"Madhushan", email:"cha@gmail.com", password:"abc"}];
        counter=1;
        const result = await exec();        
        expect(result).toBeFalsy();
    });
});

describe('searchUser', () => {
    let name;
    let arr;

    const exec = async()=>{
        db.findAll = jest.fn().mockReturnValue(arr); 
        const guest1 = new Guest();
        return await guest1.searchUser(name);
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

describe('viewProfile', ()=> {

    let userId;
    let personal_arr;
    let recommendation_arr;
    let skill_arr;
    let con_arr;
    let re_arr;
    let passedId;
    let connections1;
    let connections2;
    let alreadyValidatedSkills;
    

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        userId = 33;
        passedId = 10;
        connections1=[];
        alreadyValidatedSkills=[];
        connections2=[{ recipient_id: 6 } ];
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
        arr2= {id:26, first_name: 'Lahiru', last_name: 'Madhushan' };
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
        const guest1 = new Guest();
        return await guest1.viewProfile(userId,passedId);
    };

    it('should return an array if the profile is viewed successfully and checks whether the each connection is sent by the user', async()=> {
        const result = await exec();                               
        expect(result).toContainEqual(personal_arr);
        expect(result).toContainEqual(re_arr);
        expect(result).toContainEqual(skill_arr);  
        expect(result).toContainEqual(con_arr);    
    });

    it('should return an array if the profile is viewed successfully and checks whether the each connection is received by the user', async()=> {
        connections1=[{ requester_id: 6 } ];
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

describe('getUser', ()=>{

    let email, obj, arr, recommendation_arr, arr1, arr2, skills, name, connections1, connections2;
    
    const exec = async()=>{
        db.findOne = jest.fn().mockReturnValueOnce(obj).mockReturnValueOnce(arr1).mockReturnValueOnce(arr2).mockReturnValueOnce({first_name: 'Danushka', last_name: 'Gunathilake',profile_pic:'' }).mockReturnValueOnce({first_name: 'Danushka', last_name: 'Gunathilake',profile_pic:'' });
        db.findAll = jest.fn().mockReturnValue(arr);
        rdb.findAll = jest.fn().mockReturnValue(recommendation_arr);
        sdb.findAll = jest.fn().mockReturnValue(skills);
        cdb.findAll = jest.fn().mockReturnValueOnce(connections1).mockReturnValueOnce(connections2);
            
        const guest1 = new Guest();
        return await guest1.getUser(email);
    };
    
    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        email="osahn@gmail.com";
        connections1=[];
        connections2=[{ recipient_id: 6 } ];
        
        obj={id: 33,
             first_name: 'Oshan',
             last_name: 'Jayawardhana',
             email: 'oshan@gmail.com',
             password: 'd3d9446802a44259755d38e6d163e820',
             profile_pic: '',
             is_deleted: 0 };
          
        arr=[{ first_name: 'Oshan',
               last_name: 'Jayawardhana',
               profile_pic: '',
               password: 'd3d9446802a44259755d38e6d163e820',
               id: 33}];
          
        recommendation_arr= [
            { Recommended_by: 2, description: 'Amazing ' },
            { Recommended_by: 26, description: 'Highly recommended' }]; 

        arr1=  {first_name: 'Danushka', last_name: 'Gunathilaka',profile_pic:'' };
        arr2= {first_name: 'Lahiru', last_name: 'Madhushan',profile_pic:'' };
        
        skills = [
            { name: 'mysql hh', validations: 1 },
            { name: 'mysql skills11', validations: 1 }];
          
        re_arr =[{first_name: 'Danushka', last_name: 'Gunathilaka',profile_pic:'', description: 'Amazing ' },{first_name: 'Lahiru', last_name: 'Madhushan',profile_pic:'', description: 'Highly recommended' }] ;  
        con_arr = [ {first_name: 'Danushka', last_name: 'Gunathilake',profile_pic:'' } ]; 
        name=[{first_name: 'Oshan',
               last_name: 'Jayawardhana',
               profile_pic: '',
               password: 'd3d9446802a44259755d38e6d163e820',
               id: 33}];
    });
    
    it('should return an array if it gets the profile info successfully and checks whether the each connection is sent by the user', async()=> {
        const result = await exec();                               
        expect(result).toContainEqual(skills);
        expect(result).toContainEqual(re_arr);
        expect(result).toContainEqual(name);  
        expect(result).toContainEqual(con_arr);    
    });

    it('should return an array if it gets the profile info successfully and checks whether the each connection is received by the user', async()=> {
        connections1=[{ requester_id: 6 } ];
        connections2=[];
        const result = await exec();                               
        expect(result).toContainEqual(skills);
        expect(result).toContainEqual(re_arr);
        expect(result).toContainEqual(name);  
        expect(result).toContainEqual(con_arr);    
    });

    it('should throw an error if such user does not exist ', async()=> {
        obj=null;                                       
        await expect(async()=>{await exec()}).rejects.toThrowError('Invalid email or password');
           
    });
});