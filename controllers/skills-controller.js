const User = require('../services/user.js');
let user = new User();
const { successMessage, errorMessage } = require("../utils/message-template");

const addSkill = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const name = req.body.name;

        const response = await User.addSkill(name, passedid.id);


        if (response === true) {
            return successMessage(res, true, "Successfully added the skill");
        } else if (response == "added") {
            return errorMessage(res, "This has already added");
        } else {
            return errorMessage(res, "Unable to add the skill", 500);
        }
    } catch (err) {
        next(err);
    }
};

const removeSkill = async (req, res, next) => {
    try {
        //userid passes from url but do not pass to services
        const skillID = req.params.skillid;
        const response = await user.removeSkill(skillID);

        if (response === true) {
            return successMessage(res, true,"You have succesfully deleted this skill");
        } else {
            return errorMessage(res, "Unable to delete the message", 500);
        }
    } catch (err) {
        next(err);
    }
};

const validateSkill = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const skillID = req.params.skillid;
        const response = await user.validateSkill(skillID, passedid.id);

        if (response === true) {
            return successMessage(res, true, "You have validated the skill");
        } else if (response == "validated") {
            return errorMessage(res, "You have already validated the skill");
        } else {
            return errorMessage(res, "Unable to validate the skill");
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addSkill,
    removeSkill,
    validateSkill
}
