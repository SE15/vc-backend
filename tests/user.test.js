
const User= require("../services/user");
const db = require("../models/user-model");
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








