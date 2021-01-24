const User = require('../services/user.js');

// Instantiate User:
let user = new User();

const userController  = {};

//user functions
userController.searchUser = async (req, res, next) => {
    try {
        const keyword = req.query.keyword;    
        const users = await user.searchUser(keyword);

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

userController.viewProfile = async (req, res, next) => {
    try {
        const userID = req.params.id;    
        const profile = await user.viewProfile(userID);
        
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

userController.deleteAccount = async (req, res, next) => {
    try {
        const responce = await user.deleteAccount();
        
        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "User successfully deleted"
          }
          return res.json(response);
        }else{
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

userController.addSkill = async (req, res, next) => {
    try {
        const name = req.body.name;
        const responce = await User.addSkill(name);

        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "Successfully added the skill"
          }
          return res.json(response);
        }else if(responce == "added"){
          const response = {
            err: 0,
            obj: {},
            msg: "This skill has already added"
          }
          return res.json(response);
        }else{
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

userController.removeSkill = async (req, res, next) => {
    try {
        const skillID = req.params.id;    
        const responce = await user.removeSkill(skillID);

        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "You have succesfully deleted this skill"
          }
          return res.json(response);
        }else {
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

userController.validateSkill = async (req, res, next) => {
    try {
        const skillID = req.params.id;    
        const responce = await user.validateSkill(skillID);

        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "You have validated the skill"
          }
          return res.json(response);
        }else if(responce == "validated"){
          const response = {
            err: 0,
            obj: false,
            msg: "You have already validated the skill"
          }
          return res.json(response); 
        }else{
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

userController.addConnection = async (req, res, next) => {
    try {
        const userID = req.params.id;    
        const responce = await user.addConnection(userID);

        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "Request sent"
          }
          return res.json(response);
        }else if(responce == "sent"){
          const response = {
            err: 0,
            obj: false,
            msg: "Request already sent"
          }
          return res.json(response);
        }else{
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
  
userController.respondConnection = async (req, res, next) => {
    try {
        const connectionID = req.params.id;
        const accept = req.body.accept;
        
        const responce = await user.respondConnection(connectionID,accept);

        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "You have accepted the connection"
          }
          return res.json(response);
        }else if(responce === false){
          const response = {
            err: 0,
            obj: false,
            msg: "You have rejected the connection"
          }
          return res.json(response);
        }else{
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

userController.removeConnection = async (req, res, next) => {
    try {
        const userID = req.params.id;    
        const responce = await user.removeConnection(userID);

        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "Connection removed successfully"
          }
          return res.json(response);
        }else{
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

userController.submitRecommendation = async (req, res, next) => {
    try {
        const userID = req.params.id;   
        const description = req.body.description;    
        const responce = await user.submitRecommendation(userID, description);

        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "You have submitted the recommendation"
          }
          return res.json(response);
        }else{
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

userController.changePassword = async (req, res, next) => {
    try {
        const oldPass = req.body.oldPass;
        const newPass = req.body.newPass;
        
        const responce = await user.changePassword(oldPass, newPass);

        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "Successfully changed the password"
          }
          return res.json(response);
        }else{
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

userController.editProfile = async (req, res, next) => {
    try {
        const information = req.body;   // convert to an array 
        const responce = await user.editProfile(information);

        if(responce === true){
          const response = {
            err: 0,
            obj: true,
            msg: "Profile updated"
          }
          return res.json(response);
        }else{
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


module.exports = userController;