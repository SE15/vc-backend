const Guest = require('./guest.js');

//const User = require('..services/user.js');

// Instantiate User:
let users = new Users();

const guestController  = {};

//guest functions
guestController.searchUsers = async (req, res, next) => {
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
        //res.end('<html><body><p><%=users></p></body></html>');
        
    } catch (err) {
      next(err);
    }
  };

guestController.viewProfile = async (req, res, next) => {
    try {
        const userID = req.params.id;    
        const profile = await user.viewProfile(userID);
        
        return res.json(profile);

        /**
         * success "id, name, profile, skills : {id, name}"	
         * error exception
         */

        //res.end('<html><body><p><%=users></p></body></html>');
        
    } catch (err) {
      next(err);
    }
  };

//user event functions
guestController.searchEvents = async (req, res, next) => {
    try {
        const keyword = req.params.keyword;    
        const events = await user.searchEvents(keyword);
        /**
         * if events.length
         *      convert events array into json
         *      send json
         * else 
         *      "No result found"
         * **assume above users is the json object
        */

        /**
         * success array[event(name)]
         *  error empty array[]
         * "No result found"
         */
        if(events.length){
            return res.json(events);
        }else{
            return res.json({msg: "No result found"});
        }
        //res.end('<html><body><p><%=users></p></body></html>');
        
    } catch (err) {
      next(err);
    }
  };

guestController.viewEvent = async (req, res, next) => {
    try {
        const eventID = req.params.id;    
        const event = await user.viewEvent(eventID);

        return res.json(event);

        /**
         * success array[name,location,start_date,end_date,status]	
         * error exception
         */

        //res.end('<html><body><p><%=users></p></body></html>');
        
    } catch (err) {
      next(err);
    }
  };

guestController.createAccount = async (req, res, next) => {
    try {
        const { name, email, password, profilePic } = req.body;
        const information = [{name, email, password, profilePic}];
        const response = await user.createAccount(information);

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

        //res.end('<html><body><p><%=users></p></body></html>');
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