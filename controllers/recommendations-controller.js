const User = require('../services/user.js');
let user = new User();

const submitRecommendation = async (req, res, next) => {
    try {
        //user id taken from authentication not from url but passes in url
        let passedid = req.user;
        const userID = req.params.userid;
        const description = req.body.description;
        const responce = await user.submitRecommendation(userID, description, passedid.id);

        if (responce === true) {
            const response = {
                err: 0,
                obj: true,
                msg: "You have submitted the recommendation"
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

module.exports = {
    submitRecommendation
}