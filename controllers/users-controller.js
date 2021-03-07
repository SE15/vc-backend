const User = require('../services/user.js');
const Guest = require('../services/guest.js');

// Instantiate User:
let user = new User();
let guest = new Guest();

//user functions
const searchUser = async (req, res, next) => {
  try {
    //console.log("usr");
    //let ff = req.user;
    //console.log(ff.id);
    const keyword = req.query.keyword;  

    const users = (req.user) ? await user.searchUser(keyword) :  await guest.searchUser(keyword);

    if (users.length) {
      const response = {
        err: 0,
        obj: users,
        msg: ""
      }

      return res.json(response);
    } else {
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

const viewProfile = async (req, res, next) => {
  try {
    const userID = req.params.userid;
    let profile;
    if (req.user) {profile = await user.viewProfile(userID);}
    else {profile = await guest.viewProfile(userID);}

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

const deleteAccount = async (req, res, next) => {
  try {
    //user id taken from authentication not from url but passes in url
    let passedid = req.user;

    const responce = await user.deleteAccount(passedid.id);

    if (responce === true) {
      const response = {
        err: 0,
        obj: true,
        msg: "User successfully deleted"
      }
      return res.json(response);
    } else {
      const response = {
        err: 1,
        obj: {},
        msg: "Something is wrong"
      }
      return res.json(response);
    }
  } catch (err) {
    next(err);
  }
};


const changePassword = async (req, res, next) => {
  try {
    //user id taken from authentication not from url but passes in url
    let passedid = req.user;
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;

    const responce = await user.changePassword(oldPass, newPass, passedid.id);

    if (responce === true) {
      const response = {
        err: 0,
        obj: true,
        msg: "Successfully changed the password"
      }
      return res.json(response);
    } else {
      const response = {
        err: 1,
        obj: {},
        msg: "Something is wrong"
      }
      return res.json(response);
    }
  } catch (err) {
    next(err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    //user id taken from authentication not from url but passes in url
    let passedid = req.user;
    const information = req.body;   // convert to an array 
    const responce = await user.editProfile(information, passedid.id);

    if (responce === true) {
      const response = {
        err: 0,
        obj: true,
        msg: "Profile updated"
      }
      return res.json(response);
    } else {
      const response = {
        err: 1,
        obj: {},
        msg: "Something is wrong"
      }
      return res.json(response);
    }

  } catch (err) {
    next(err);
  }
};

const createAccount = async (req, res, next) => {
  try {
    const first_name = req.body.firstName;
    const last_name = req.body.lastName;
    const { email, password } = req.body;
    const information = [{ first_name, last_name, email, password }];
    const response = await guest.createAccount(information);

    if (response === true) {
      const response = {
        err: 0,
        obj: true,
        msg: "User successfully registered"
      }
      return res.json(response);
    } else if (response === false) {
      const response = {
        err: 0,
        obj: false,
        msg: "User already exists"
      }
      return res.json(response);
    } else {
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

module.exports = {
  searchUser,
  viewProfile,
  changePassword,
  deleteAccount,
  editProfile,
  createAccount
}