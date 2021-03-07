const User = require('../services/user.js');
let user = new User();
const { successMessage, errorMessage } = require("../utils/message-template");

const submitRecommendation = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const userID = req.params.userid;
        const description = req.body.description;
        const response = await user.submitRecommendation(userID, description, passedid.id);

        if (response === true) {
            return successMessage(res, true, "You have submitted the recommendation");
        } else {
            return errorMessage(res, "Unable to submit the recommendation", 500);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    submitRecommendation
}