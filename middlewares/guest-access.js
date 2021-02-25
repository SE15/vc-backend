const guestAccess = (req, res, next) => {
    if ('guestAllowed' in req) {
        const response = {
            err: 1,
            obj: {},
            msg: "Access denied"
        }
        return res.json(response);
    }
    
    req.guestAllowed = true;
    next();
}

module.exports = guestAccess;