const jwt = require('jsonwebtoken');
const config = require('config');
const md5 = require('md5');
const { successMessage, errorMessage } = require("../utils/message-template");
const Guest = require('../services/guest.js');

let guest = new Guest();

const login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        let user;
        try {
            user = await guest.getUser(email);
        } catch (e) {
            return errorMessage(res, 'Invalid email or password', 401);
        }
        
        let pass = user[0][0].password;
        let passw = md5(password);
        let usr = user[0][0];

        if (pass === passw) {
            jwt.sign(
                { userID: usr.id, expiresIn: 3600, firstName: usr.first_name, lastName: usr.last_name, profilePic: usr.profile_pic },
                config.get('jwtSecret'),
                (err, token) => {
                    if (err) throw err;
                    return successMessage(res, {token})
                })
        } else {
            return errorMessage(res, "Invalid email or password", 401);
        }

    } catch (err) {
        next(err);
    }
};

module.exports = {
    login
}