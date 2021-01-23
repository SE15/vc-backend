const config = require('config');
const jwt = require('jsonwebtoken');

function authorization(req, res, next){
    const token = req.header('x-auth-token');

    //check for token
    if(!token){
        return res.status(401).json({msg: "No token, authorization denied"});
    }

    try{
        //verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        //add user from payload
        req.user = decoded;

    }catch(err){
        return next(err);
    }
}

module.exports = authorization;