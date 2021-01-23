const User = require('../services/user.js');

// Instantiate User:
//let guest = new Guest();

const guestController  = {};

//guest functions
guestController.searchUser = async (req, res, next) => {
    try {
        const keyword = req.params.keyword; 

        const users = await guest.searchUser(keyword);  
        
        
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

guestController.viewProfile = async (req, res, next) => {
    try {
        const userID = req.params.id;    
        const profile = await guest.viewProfile(userID);
        
        return res.json(profile);

        /**
         * success "id, name, profile, skills : {id, name}"	
         * error exception
         */

        
        
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
            return res.json({ msg: "User successfully registered" });
        }else if(response === false){
            return res.json({ msg: "User already exists" });
        }else{
            return res.json({ msg: "Something is wrong" });
        }

        /**
         * success array[name,location,start_date,end_date,status]	
         * error exception
         */

        
/*
        //simple validation 
        if(!name || !email || !password){
            return res.status(400).json({ msg: 'Please enter all fields.'});
        }
        //check for existing user
        User.findOne({ email})
            .then(user =>{
                if(user) return res.status(400).json({ msg: 'User already exists'});
                
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //create salt & hash
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => {
                                jwt.sign(
                                    {id: user.id},
                                    config.get('jwtSecret'),
                                    { expiresIn: 3600 },
                                    (err, token) => {
                                        if(err) throw err;
                                        return res.json({
                                            token,
                                            user: {
                                                id: user.id,
                                                name: user.name,
                                                email: user.email
                                            }
                                        });
                                    }
                                )
                            });
                    })
                });
*/
    } catch (err) {
      next(err);
    }
  };



module.exports = guestController;
