
const User= require("../services/user");
const db = require("../models/user-model");
const sequelize = require("../config/database");
//const { sequelize } = require("../models/user-model");


describe('searchUser', () => {

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
    });

    test('array containing one element', async()=>{
        db.findAll = jest.fn().mockReturnValue([{ first_name: 'Lahiru', last_name: 'Madhushan', profile_pic: null }]) ;   
            
        const user1 = new User();
        const result=await user1.searchUser("Lahiru");
        expect(result).toContainEqual({ first_name: 'Lahiru', last_name: 'Madhushan', profile_pic: null });
    
    });

    test('empty array', async()=>{
        db.findAll = jest.fn().mockReturnValue([]) ;   
            
        const user1 = new User();
        const result=await user1.searchUser("Pasan");        
        expect(result).toEqual([]);
    
    });
});








