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
        console.log(pass);
        let passw = md5(password);
        console.log(passw);
        let usr = user[0][0];
        console.log(usr);

        if (pass === passw) {
            jwt.sign(
                { userID: usr.id, expiresIn: 3600, firstName: first_name, lastName: last_name, profilePic: profile_pic },
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