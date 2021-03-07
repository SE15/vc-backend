const User = require('../services/user.js');
let user = new User();

const addConnection = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        //let passedid = req.user;
        const passedid = req.body.recipient_id;
        const userID = req.params.userid;
        const responce = await user.addConnection(userID, passedid);

        if (responce === true) {
            const response = {
                err: 0,
                obj: true,
                msg: "Request sent"
            }
            return res.json(response);
        } else if (responce == "sent") {
            const response = {
                err: 0,
                obj: false,
                msg: "Request already sent"
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

const respondConnection = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const recipientid = req.params.recipientid;
        const accept = req.body.accept;

        const responce = await user.respondConnection(recipientid, accept, passedid.id);

        if (responce === true) {
            const response = {
                err: 0,
                obj: true,
                msg: "You have accepted the connection"
            }
            return res.json(response);
        } else if (responce === false) {
            const response = {
                err: 0,
                obj: false,
                msg: "You have rejected the connection"
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

const removeConnection = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const userID = req.params.userid;
        const responce = await user.removeConnection(userID, passedid.id);

        if (responce === true) {
            const response = {
                err: 0,
                obj: true,
                msg: "Connection removed successfully"
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
    addConnection,
    respondConnection,
    removeConnection
}