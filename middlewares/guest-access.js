const { errorMessage } = require("../utils/message-template");

const guestAccess = (req, res, next) => {

    if ('guestAllowed' in req) {
        return errorMessage(res, "Access denied", 403);
    }
    
    req.guestAllowed = true;
    next();
}

module.exports = guestAccess;