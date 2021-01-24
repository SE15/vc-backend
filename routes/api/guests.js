const express = require('express');
const router = express.Router();

const guestController = require('../../controllers/guestController');

//guest routes
router.get('/users/', guestController.searchUser);
router.get('/users/:id', guestController.viewProfile);
router.post('/users/register', guestController.createAccount);
router.get('/auth/', guestController.login);
module.exports = router;