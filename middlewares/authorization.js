const config = require('config');
const jwt = require('jsonwebtoken');
const { errorMessage } = require("../utils/message-template");

function authorization(req, res, next) {
    const token = req.header('x-auth-token');
    //check for token
    if (!token) {
        if ('guestAllowed' in req) {
            return next();
        } else {
            return errorMessage(res, "No token, authorization denied", 401);
        }
    }

    try {
        //verify token
        console.log(token);
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        if (!decoded) {
            return errorMessage(res, "AToken verification failed", 401);
        } else {
            req.user = decoded;
            next();
        }
        //add user from payload
        //req.user = decoded;
        //console.log(req.user.id);
        //console.log(decoded.id);

    } catch (err) {
        console.log(err);
        return errorMessage(res, "Access denied, no session", 401);
    }
}

module.exports = authorization;