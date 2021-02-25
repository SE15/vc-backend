const errorLog = (...params) => {
    console.error(...params);
}

const errorHandler = (error, req, res, next) => {
    errorLog(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: error.message });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    }

    next(error);
}

module.exports = errorHandler;