const User = require('../services/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');

// Instantiate User:
//let guest = new Guest();

const guestController  = {};

//guest functions
guestController.searchUser = async (req, res, next) => {
    try {
        const keyword = req.query.keyword; 

        const users = await guest.searchUser(keyword);  

        if(users.length){
            const response = {
                err: 0,
                obj: users,
                msg: ""
              }
              return res.json(response);
        }else{
            const response = {
                err: 1,
                obj: {},
                msg: "No result found"
              }
              return res.json(response);
        }
        
        
    } catch (err) {
      next(err);
    }
  };

guestController.viewProfile = async (req, res, next) => {
    try {
        const userID = req.params.id;    
        const profile = await guest.viewProfile(userID);

        const response = {
            err: 0,
            obj: profile,
            msg: ""
          }
          return res.json(response);        
    } catch (err) {
      next(err);
    }
  };

guestController.createAccount = async (req, res, next) => {
    try {
        const { name, email, password, profilePic } = req.body;
        const information = [{name, email, password, profilePic}];
        const response = await guest.createAccount(information);

        if(response === true){
            const response = {
                err: 0,
                obj: true,
                msg: "User successfully registered"
              }
              return res.json(response);
        }else if(response === false){
            const response = {
                err: 0,
                obj: false,
                msg: "User already exists"
              }
              return res.json(response);
        }else{
            const response = {
                err: 0,
                obj: {},
                msg: "Something is wrong"
              }
              return res.json(response);
        }

    } catch (err) {
      next(err);
    }
  };

  guestController.login = (req, res, next) => {
    try {
        const email = req.query.email; 
        const password = req.query.password; 

        const user = guest.getUser(email);

        //validate password
        bcrypt.compare(password, user.password)
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

      
    } catch (err) {
      next(err);
    }
  };


module.exports = guestController;