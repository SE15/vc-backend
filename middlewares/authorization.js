const config = require('config');
const jwt = require('jsonwebtoken');
const { errorMessage } = require("../utils/message-template");

function authorization(req, res, next) {
    const authHeader = req.get('Authorization');      //token set to auth header by client
    if (!authHeader) {
        if ('guestAllowed' in req) {
            return next();
        } else {
            return errorMessage(res, "No token, authentication failed", 401);
        }
    }

    const token = authHeader.split(' ')[1]; //'Bearer token'-->['Bearer','token']-->'token'    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.get('jwtSecret'));
    }

    catch (err) {
        errorMessage(res, "Something went wrong", 500);
    }

    if (!decodedToken) {
        return errorMessage(res, "Not authenticated.", 401);
    }

    req.user = decodedToken.userID;
    next();
}

module.exports = authorization;