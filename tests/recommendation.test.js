const rdb = require("../models/recommendation-model");
const sequelize = require("../config/database");
const Recommendation = require("../services/user/recommendation");

describe('saveToDatabase', () => {
    let recommendationInfo;

    const exec = async()=>{
        rdb.create = jest.fn(); 
        const recommendation= new Recommendation(recommendationInfo);
        return await recommendation.saveToDatabase();
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        recommendationInfo={user_id:1,recommended_by:"sql",description:"amaizing"}
    });

    it('should return true when adding new recommendation is successfull', async()=>{
        
        const result = await exec();
        expect(result).toBeTruthy();
    
    });

});

describe('getInformation', () => {
    let recommendationInfo;
    let obj;

    const exec = async()=>{
        rdb.findAll = jest.fn().mockReturnValue(obj); 
        const recommendation= new Recommendation(recommendationInfo);
        return await recommendation.getInformation();
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        recommendationInfo={user_id:1,recommended_by:"sql",description:"amaizing"}
    });

    it('should return true when adding new recommendation is successfull', async()=>{
        obj=[{recommended_by:2,description:"amazing"}];
        const result = await exec();
        expect(result).toBeTruthy();
    
    });

    it('should return false when adding new recommendation is not successfull', async()=>{
        obj=undefined;
        const result = await exec();
        expect(result).toBeFalsy();
    
    });

});

describe('checkValidations', () => {
    let recommendationInfo;
    let obj;
    let user_id;
    let recommended_by;

    const exec = async()=>{
        rdb.findOne = jest.fn().mockReturnValue(obj); 
        return await Recommendation.checkValidations(user_id,recommended_by);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        recommendationInfo={user_id:1,recommended_by:2,description:"amaizing"};
        user_id=1;
        recommended_by=2;
    });

    it('should return false when trying to recommend already recommended user', async()=>{
        obj=[{recommended_by:2,description:"amazing"}];
        const result = await exec();
        expect(result).toBeFalsy();
    
    });

    it('should return true when adding new recommendation already not submitted', async()=>{
        obj=null;
        const result = await exec();
        expect(result).toBeTruthy();
    
    });

});