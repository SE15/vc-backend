const jwt = require('jsonwebtoken');
const config = require('config');
const md5 = require('md5');

const login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        let user = await guest.getUser(email);
        //console.log(user); 
        //validate password
        //console.log(user[0]);
        let pass = user[0][0].password;
        console.log(pass);
        let passw = md5(password);
        console.log(passw);
        let usr = user[0][0];
        /*bcrypt.compare(passw, pass)
        .then(isMatch => {
            if(!isMatch){
                const response = {
                    err: 1,
                    obj: {},
                    msg: "Invalid password"
                  }
                  return res.json(response);
            }
            
            jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    return res.json({
                        token,
                        user: user
                    });
                }
            )
        });
*/    if (pass === passw) {
            jwt.sign(
                { id: usr.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    console.log(token);
                    return res.json({
                        token,
                        user: user
                    });

                })
        } else {
            const response = {
                err: 1,
                obj: {},
                msg: "Invalid password"
            }
            return res.json(response);
        }

    } catch (err) {
        next(err);
    }
};

module.exports = {
    login
}