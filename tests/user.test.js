

const { describe } = require("../models/user-model");
const User= require("../services/user");
const db = require("../models/user-model");


test('searchUser', () => {
        
        db.findAll = function(){
            var p = Promise.resolve([{ first_name: 'Lahiru', last_name: 'Madhushan', profile_pic: null }]);
            p.then(function(user){
                console.log(user);
                return user;
            });
            //return { first_name: 'Lahiru', last_name: 'Madhushan', profile_pic: null };
        }
        
        const user1 = new User();
        const result = user1.searchUser("Lahiru");
                
        console.log(result);
        expect.arrayContaining({ first_name: 'Lahiru', last_name: 'Madhushan', profile_pic: null });
        //expect(result).toContainObject({ first_name: 'Lahiru' });
    
});
/*
test('check', () => {
    
        const result = lib.absolute(1);
        expect(result).toBe(1);        
    
});
*/
/*const { IM_A_TEAPOT } = require("http-status");
const User= require("../services/user");
jest.mock('../services/user');

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    User.mockClear();
  });

it('nn', () => {
    const user1 = new User();
    user1.searchUser
});
*/