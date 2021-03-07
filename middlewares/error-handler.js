const { successMessage, errorMessage } = require("../utils/message-template");

const errorLog = (...params) => {
    console.error(...params);
}

const errorHandler = (error, req, res, next) => {
    errorLog(error.message);
    
    return errorMessage(res, error.message, 500);
}

module.exports = errorHandler;