const Skill = require('./services/user/skill');

//TODO: Delete this file after adding these methods to user.js

async function validateSkill(id) {
    //temp values
    this.user_id = 10;

    try { //for testing purpose. Otherwise, try-catch must be in the user controller
        let skill = await Skill.create(id);
        return await skill.incrementValidations(this.user_id);
    } catch (err) {
        console.log(err.message);
    }
}

async function addSkill(name) {
    //temp data
    this.user_id = 2;

    try { //for testing purpose. Otherwise, try-catch must be in the user controller
        let skill = new Skill({user_id: this.user_id, name: name});
        await skill.saveToDatabase(true);
        return skill;
    } catch (err) {
        console.log(err.message);
    }
}

async function removeSkill(id) {
    //temp data
    this.user_id = 1;

    try { //for testing purpose. Otherwise, try-catch must be in the user controller
        let skill = await Skill.create(id);
        return await skill.destroy();
    } catch (err) {
        console.log(err.message);
    }
}
validateSkill(17).then(result => console.log('Skill Validated:', result));
addSkill('Design Innovation').then(result => console.log('Skill Added: ', result));
removeSkill(39).then(result => console.log('Skill Removed: ', result));
