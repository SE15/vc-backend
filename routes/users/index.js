const routes = require('express').Router();
const authorization = require('../../middlewares/authorization');
const guestAccess = require('../../middlewares/guest-access');

const { searchUser, createAccount, viewProfile, deleteAccount, changePassword, editProfile} = require('../../controllers/users-controller');

routes.use('/:userid/connections', require('./connections'));
routes.use('/:userid/recommendations', require('./recommendations'));
routes.use('/:userid/skills', require('./skills'));

routes.get('/', guestAccess, authorization, searchUser);
routes.post('/', createAccount);

routes.get('/:userid', authorization, viewProfile);
//routes.get('/:userid', guestAccess, authorization, viewProfile);
routes.delete('/:userid', authorization, deleteAccount);
routes.put('/:userid', authorization, changePassword);
routes.post('/:userid', authorization, editProfile);

module.exports = routes;