const Guest= require("../services/guest");
const db = require("../models/user-model");
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