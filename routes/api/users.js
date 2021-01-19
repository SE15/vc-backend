const express = require('express');
const router = express.Router();
const authorization = require('../../middlewares/auth');

const userController = require('../../controllers/userController');

//user routes
router.get('/users/', authorization, userController.searchUsers);
router.get('/users/:id', authorization, userController.viewProfile);
router.post('/users/skills/add', authorization, userController.addSkill);
router.delete('/users/skills/:id', authorization, userController.removeSkill);
router.put('/users/skills/:id', authorization, userController.validateSkill);
router.post('/users/connections/add/:id', authorization, userController.addConnection);
router.put('/users/connections/respond/:id', authorization, userController.respondConnection);
router.delete('/users/connections/:id', authorization, userController.removeConnection);
router.post('/users/recommendations/:id', authorization, userController.submitRecommendation);
router.delete('/users/', authorization, userController.deleteAccount);
router.put('/users/changepwd', authorization, userController.changePassword);
router.put('/users/edit', authorization, userController.editProfile);

//user event routes
router.get('/events/', authorization, userController.searchEvents);
router.get('/events/:id', authorization, userController.viewEvent);
router.put('/events/:id/join', authorization, userController.joinEvent);
router.put('/events/:id/leave', authorization, userController.leaveEvent);
router.put('/events/:id', authorization, userController.updateEvent);
router.delete('/events/:id', authorization, userController.deleteEvent);

//user event membership routes
router.put('/memberships/:id', authorization, userController.updateRole);
router.put('/memberships/acceptRequest/:id', authorization, userController.acceptEventRequest);

module.exports = router;