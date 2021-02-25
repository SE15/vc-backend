const User = require('../services/user.js');
let user = new User();

const addSkill = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const name = req.body.name;

        const responce = await User.addSkill(name, passedid.id);


        if (responce === true) {
            const response = {
                err: 0,
                obj: true,
                msg: "Successfully added the skill"
            }
            return res.json(response);
        } else if (responce == "added") {
            const response = {
                err: 0,
                obj: {},
                msg: "This skill has already added"
            }
            return res.json(response);
        } else {
            const response = {
                err: 1,
                obj: {},
                msg: "Something is wrong"
            }
            return res.json(response);
        }
    } catch (err) {
        next(err);
    }
};

const removeSkill = async (req, res, next) => {
    try {
        //userid passes from url but do not pass to services
        const skillID = req.params.skillid;
        const responce = await user.removeSkill(skillID);

        if (responce === true) {
            const response = {
                err: 0,
                obj: true,
                msg: "You have succesfully deleted this skill"
            }
            return res.json(response);
        } else {
            const response = {
                err: 1,
                obj: {},
                msg: "Something is wrong"
            }
            return res.json(response);
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
        const responce = await user.validateSkill(skillID, passedid.id);

        if (responce === true) {
            const response = {
                err: 0,
                obj: true,
                msg: "You have validated the skill"
            }
            return res.json(response);
        } else if (responce == "validated") {
            const response = {
                err: 0,
                obj: false,
                msg: "You have already validated the skill"
            }
            return res.json(response);
        } else {
            const response = {
                err: 1,
                obj: {},
                msg: "Something is wrong"
            }
            return res.json(response);
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
