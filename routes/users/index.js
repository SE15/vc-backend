const router = require('express').Router();
const authorization = require('../../middlewares/authorization');
const guestAccess = require('../../middlewares/guest-access');

const { searchUser, createAccount, viewProfile, deleteAccount, editProfile} = require('../../controllers/users-controller');

router.use('/:userid/connections', require('./connections'));
router.use('/:userid/recommendations', require('./recommendations'));
router.use('/:userid/skills', require('./skills'));

router.get('/', guestAccess, authorization, searchUser);
router.post('/', createAccount);

router.get('/:userid', viewProfile);
router.delete('/:userid', authorization, deleteAccount);
router.put('/:userid', authorization, editProfile);

module.exports = router;