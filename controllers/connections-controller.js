const User = require('../services/user.js');
let user = new User();
const { successMessage, errorMessage } = require("../utils/message-template");

const getConnectionRequests = async (req, res, next) => {
    try {
        const connections =  await user.viewRequests(req.user);
        //const connections =  await user.viewRequests(req.params.userid);
        
        return successMessage(res, connections);
    } catch (error) {
        next(error);
    }
}

const getConnectionStatus = async (req, res, next) => {
    try {
        const state =  await user.getConnectionState(req.user, req.params.recipientid);
        //const state =  await user.getConnectionState(req.params.userid, req.params.recipientid);
        return successMessage(res, state);
    } catch (error) {
        next(error);
    }
}

const addConnection = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        //let passedid = req.body.user;
        const userID = req.params.userid;
        const response = await user.addConnection(userID, passedid);

        if (response === true) {
            return successMessage(res, true, 'Requeest sent to the user');
        } else if (response == "sent") {
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
        //let passedid = req.params.userid;
        const recipientid = req.params.recipientid;
        const accept = req.body.accept;

        const response = await user.respondConnection(recipientid, accept, passedid);

        if (response === true) {
            return successMessage(res, true, "You have accepted the connection");
        } else if (response === false) {
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
        const userID = req.params.recipientid;
        const response = await user.removeConnection(userID, passedid);

        if (response === true) {
            return successMessage(res, true, "Connection removed successfully");
        } else {
            return errorMessage(res, "Unable to remove the connection", 500);
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getConnectionRequests,
    getConnectionStatus,
    addConnection,
    respondConnection,
    removeConnection
}