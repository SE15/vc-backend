const User = require('../services/user.js');
const Guest = require('../services/guest.js');
const { successMessage, errorMessage } = require("../utils/message-template");

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

    let users = [];
    if (keyword.indexOf(' ') >= 0) {
      const keywords = keyword.split(' ');
      for (const key of keywords) {
        const results = (req.user) ? await user.searchUser(key) : await guest.searchUser(key);
        users = [...users, ...results];
      }
      users = users.filter((user, ind) => {
        let tempUsers = [...users];
        tempUsers.splice(ind);
        for (const u of tempUsers) {
          if (u.id === user.id) return false;
        }
        return true;
      })
    } else {
      users = (req.user) ? await user.searchUser(keyword) : await guest.searchUser(keyword);
    }

    if (users.length) {
      return successMessage(res, users, "Users found");
    } else {
      return errorMessage(res, "No results found");
    }
  } catch (err) {
    next(err);
  }
};

const viewProfile = async (req, res, next) => {
  try {
    const userID = req.params.userid;

    const profile = (req.user) ? await user.viewProfile(userID) : await guest.viewProfile(userID);
    let output = profile[0][0];
    output.skills = profile[1];
    output.recommendations = profile[2];
    output.connections = profile[3]

    return successMessage(res, output, "User found");

  } catch (err) {
    next(err);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    //user id taken from authentication not from url but passes in url
    let passedid = req.user;

    const response = await user.deleteAccount(passedid);

    if (response === true) {
      return successMessage(res, true, "User successfully deleted");
    } else {
      return errorMessage(res, "Unable to delete the account", 500);
    }
  } catch (err) {
    next(err);
  }
};


const changePassword = async (req, res, next) => {
  try {
    //user id taken from authentication not from url but passes in url
    let passedid = req.user;

  } catch (err) {
    next(err);
  }
};

const editProfile = async (req, res, next) => {
  try {
    //user id taken from authentication not from url but passes in url
    let passedid = req.user;
    let response;

    const method = req.body.method;

    switch (method) {
      case 'edit-info':
        const information = req.body;   // convert to an array 
        response = await user.editProfile(information, passedid);

        if (response === true) {
          return successMessage(res, true, "Successfully updated the profile");
        } else {
          return errorMessage(res, "Unable to update the profile", 500);
        }
      case 'change-password':
        const oldPass = req.body.oldPass;
        const newPass = req.body.newPass;

        response = await user.changePassword(oldPass, newPass, passedid);

        if (response === true) {
          return successMessage(res, true, "Successfully changed the password");
        } else {
          return errorMessage(res, "Unable to change the password", 500);
        }

      case 'change-profile-pic':
        const profilePic = 'http://localhost:5000/' + req.file.filename;

        response = await user.editProfile({ profile_pic: profilePic }, passedid);

        if (response === true) {
          return successMessage(res, profilePic, "Successfully changed the profile picture");
        } else {
          return errorMessage(res, "Unable to change the profile picture", 500);
        }

      default:
        return errorMessage(res, method);
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
      return successMessage(res, true, "User successfully registered");
    } else if (response === false) {
      return errorMessage(res, "User already exists");
    } else {
      return errorMessage(res, "Unable to create an account", 500);
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
