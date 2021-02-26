const User = require('../services/user.js');
let user = new User();
const { successMessage, errorMessage } = require("../utils/message-template");

const addConnection = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const userID = req.params.userid;
        const responce = await user.addConnection(userID, passedid.id);

        if (responce === true) {
            return successMessage(res, true, 'Requeest sent to the user');
        } else if (responce == "sent") {
            return errorMessage(res, "Request already sent to the user")
        } else {
            return errorMessage(res, "Unable to add the connection", 500);
        }
    } catch (err) {
        next(err);
    }
};

const respondConnection = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const recipientid = req.params.recipientid;
        const accept = req.body.accept;

        const responce = await user.respondConnection(recipientid, accept, passedid.id);

        if (responce === true) {
            return successMessage(res, true, "You have accepted the connection");
        } else if (responce === false) {
            return successMessage(res, true, "You have rejected the connection");
        } else {
            return errorMessage(res, "Unable to respond to connection", 500);
        }
    } catch (err) {
        next(err);
    }
};

const removeConnection = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const userID = req.params.userid;
        const responce = await user.removeConnection(userID, passedid.id);

        if (responce === true) {
            return successMessage(res, true, "Connection removed successfully");
        } else {
            return errorMessage(res, "Unable to remove the connection", 500);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addConnection,
    respondConnection,
    removeConnection
}