//const User = require('../services/user.js');

// Instantiate User:
//let user = new User();

const userController  = {};

//user functions
userController.searchUsers = async (req, res, next) => {
    try {
        const keyword = req.params.keyword; 

        const users = await user.searchUsers(keyword);  
        
        
        /**const users = await user.searchUsers(keyword);
         * if users.length
         *      convert users array into json
         *      send json
         * else 
         *      "No result found"
         * **assume above users is the json object
        */
        
        /**
         * success 
         *      array[user(name,profpic)]
         * error empty array[]
         *      "No result found"
         */
        if(users.length){
            return res.json(users);
        }else{
            return res.json({msg: "No result found"});
        }
        
    } catch (err) {
      next(err);
    }
  };

userController.viewProfile = async (req, res, next) => {
    try {
        const userID = req.params.id;    
        const profile = await user.viewProfile(userID);
        
        return res.json(profile);

        /**
         * success "id, name, profile, skills : {id, name}"	
         * error exception
         */

        
    } catch (err) {
      next(err);
    }
  };

userController.deleteAccount = async (req, res, next) => {
    try {
        const responce = await user.deleteAccount();

        if(responce === true){
            return res.json({ msg: "User successfully deleted" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }
        
        /**
         * success TRUE
         * "User successfully deleted"
         * error exception
         */
        
    } catch (err) {
      next(err);
    }
  };

userController.addSkill = async (req, res, next) => {
    try {
        const name = req.body.name;    
        const responce = await user.addSkill(name);

        if(responce === true){
            return res.json({ msg: "Successfully added the skill" });
        }else if(responce == "added"){
            return res.json({ msg: "This skill has already added" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success TRUE
         * "Successfully added the skill"
         * error exception => previously added? or not?
         * "This skill has already added"
         */

        
        
    } catch (err) {
      next(err);
    }
  };

userController.removeSkill = async (req, res, next) => {
    try {
        const skillID = req.params.id;    
        const responce = await user.removeSkill(skillID);

        if(responce === true){
            return res.json({ msg: "You have succesfully deleted this skill" });
        }else {
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success TRUE
         * "You have succesfully deleted this skill"
         * error exception
         */

        
    } catch (err) {
      next(err);
    }
  };

userController.validateSkill = async (req, res, next) => {
    try {
        const skillID = req.params.id;    
        const responce = await user.validateSkill(skillID);

        if(responce === true){
            return res.json({ msg: "You have validated the skill" });
        }else if(responce == "validated"){
            return res.json({ msg: "You have already validated the skill" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success TRUE
         * "You have validated the skill"
         * error exception => previously validated? or not?
         * "You have already validated the skill"
         */

        
    } catch (err) {
      next(err);
    }
  };

userController.addConnection = async (req, res, next) => {
    try {
        const userID = req.params.id;    
        const responce = await user.addConnection(userID);

        if(responce === true){
            return res.json({ msg: "Request sent" });
        }else if(responce == "sent"){
            return res.json({ msg: "Request already sent" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success TRUE
         * "Request sent"
         * error exception
         * ?? "Request already sent" 
         */

        
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
            return res.json({ msg: "You have accepted the connection" });
        }else if(responce === false){
            return res.json({ msg: "You have rejected the connection" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success TRUE
         * "You have accepted the connection"
         * SUCCESS FALSE
         * "You have rejected the connection"
         * error exception
         */

        
    } catch (err) {
      next(err);
    }
  };

userController.removeConnection = async (req, res, next) => {
    try {
        const userID = req.params.id;    
        const responce = await user.removeConnection(userID);

        if(responce === true){
            return res.json({ msg: "Connection removed successfully" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success TRUE
         * "Connection removed successfully"
         * error exception
         * "Failed to remove connection" in sequence
         */

        
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
            return res.json({ msg: "You have submitted the recommendation" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success TRUE
         * "You have submitted a recommendation"
         * error exception
         * "Unable to submit" in sequence
         */

        
    } catch (err) {
      next(err);
    }
  };

userController.changePassword = async (req, res, next) => {
    try {
        const oldPass = req.body.oldPass;
        const newPass = req.body.newPass;
        const responce = await user.changePassword(oldPass, newPass);

        // what is the exception

        if(responce === true){
            return res.json({ msg: "Successfully changed the password" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success TRUE
         * "Successfully changed the password"
         * exception => validate oldPass => compare newPass and oldPass
         * 
         */
        
    } catch (err) {
      next(err);
    }
  };

userController.editProfile = async (req, res, next) => {
    try {
        const information = req.body;   // convert to an array 
        const responce = await user.editProfile(information);

        // what is validate means

        if(responce === true){
            return res.json({ msg: "Profile updated" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success TRUE
         * "Profile updated"
         * error exception => information validate
         */

        
    } catch (err) {
      next(err);
    }
  };


module.exports = userController;