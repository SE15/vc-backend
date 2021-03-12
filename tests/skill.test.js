const sdb = require("../models/skill-model");
const vdb = require("../models/validation-model");
const sequelize = require("../config/database");
const Skill = require("../services/user/skill");

describe('create', () => {
    let id;
    let obj;

    const exec = async()=>{
        sdb.findOne = jest.fn().mockReturnValue(obj); 
        return await Skill.create(id);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        obj={id:1,name:"sql",user_id:1,validations:0}
    });

    it('should return an skill object if can find a skill related a skill id', async()=>{
        
        const result = await exec();
        expect(result).toEqual({id:1,name:"sql",user_id:1,validations:0});
    
    });

});

describe('incrementValidations', () => {
    let user_id;
    let count;
    let skillInfo;

    const exec = async()=>{
        vdb.count = jest.fn().mockReturnValue(count);
        vdb.create = jest.fn(); 
        sdb.update = jest.fn();
        sequelize.transaction = jest.fn().mockImplementation((func) =>{
            func();
        });
        const skill=new Skill(skillInfo);
        return await skill.incrementValidations(user_id);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        user_id=2;
        count=0;
        skillInfo={id:1,name:"sql",user_id:1,validations:0};
    });

    it('should return a message when user trying to validate his own skill', async()=>{
        user_id=1;
        const result = await exec();
        expect(result).toEqual('You cannot validate your own skill');
    
    });

    it('should return a message when user trying to validate a already validated skill', async()=>{
        count=1;
        const result = await exec();
        expect(result).toEqual('validated');
    
    });

    it('should return true when validation is successfull', async()=>{
        const result = await exec();
        expect(result).toBeTruthy();
    
    });

});

describe('destroy', () => {
    let value;
  
    const exec = async()=>{
        sdb.destroy = jest.fn().mockReturnValue(value);
        const skill=new Skill(skillInfo);
        return await skill.destroy();
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        skillInfo={id:1,name:"sql",user_id:1,validations:0};
    });

    it('should return true when skill deletion is successfull', async()=>{
        value=true;
        const result = await exec();
        expect(result).toBeTruthy();
    
    });

    it('should return false when skill deletion is not successfull', async()=>{
        value=false;
        const result = await exec();
        expect(result).toBeFalsy();
    
    });

});

describe('saveToDatabase', () => {
    let isNew;
    let t;
  
    const exec = async()=>{
        const skill=new Skill(skillInfo);
        return await skill.saveToDatabase(isNew,t);
    };

    beforeEach(()=>{
        sequelize.authenticate = jest.fn();
        skillInfo={id:1,name:"sql",user_id:1,validations:0};
        isNew=true;
        t=null;
    });

    it('should return false when throw an error in process', async()=>{
        sdb.create = jest.fn(new Error());
        const result = await exec();
        expect(result).toBeFalsy();
    
    });

    it('should return true when new skill adding is successfull', async()=>{
        sdb.create = jest.fn();
        sdb.findOne = jest.fn().mockReturnValue(skillInfo);
        const skill= new Skill(skillInfo);
        const result = await skill.saveToDatabase(isNew);
        expect(result).toBeTruthy();

    });

    it('should return true when updating an existing skill is successfull(transaction null)', async()=>{
        isNew=false;
        sdb.update = jest.fn();
        const result = await exec();
        expect(result).toBeTruthy();
    
    });

    it('should return true when updating an existing skill is successfull(transaction not null)', async()=>{
        isNew=false;
        t=1;
        sdb.update = jest.fn();
        const result = await exec();
        expect(result).toBeTruthy();
    
    });

});