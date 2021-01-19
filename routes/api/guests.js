const express = require('express');
const router = express.Router();

const guestController = require('../../controllers/guestController');

//guest routes
router.get('/users/', guestController.searchUsers);
router.get('/users/:id', guestController.viewProfile);
router.get('/events/', guestController.searchEvents);
router.get('/events/:id', guestController.viewEvent);

module.exports = router;