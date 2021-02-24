const express = require('express');
const router = express.Router();

const guestController = require('../../controllers/guestController');

//guest routes
router.get('/users/', guestController.searchUser);
router.get('/users/:userid', guestController.viewProfile);
router.post('/users/registration', guestController.createAccount);
router.get('/auth/login', guestController.login);
module.exports = router;