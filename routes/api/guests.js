const express = require('express');
const router = express.Router();

const guestController = require('../../controllers/guestController');

//guest routes
router.get('/users/', guestController.searchUser);
router.get('/users/:id', guestController.viewProfile);

module.exports = router;