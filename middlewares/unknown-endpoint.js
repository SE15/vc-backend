const { errorMessage } = require("../utils/message-template");

const unknownEndpoint = (req, res) => {
    return errorMessage(res, "Unknown endpoint");
}

module.exports = unknownEndpoint;